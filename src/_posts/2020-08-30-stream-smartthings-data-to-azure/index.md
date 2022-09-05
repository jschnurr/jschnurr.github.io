---
title: Stream SmartThings data to Azure
description: Store and analyze events from your smart devices and sensors in the cloud
# keywords: [wsl 2, memory, ram, memory usage]
categories: [smarthome, cloud]
# lastUpdated: 2022-08-07
---

![image](https://images.unsplash.com/photo-1558346490-a72e53ae2d4f?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&fit=max&ixid=eyJhcHBfaWQiOjExNzczfQ&w=1000)

My home has over 70 smart devices, including switches, lights, contact sensors, motion sensors, thermostats and various controllers.  They come from various vendors using myriad technologies, including a cool kit from [Konnected]("https://konnected.io/") that helped me give my old alarm system a smarthome upgrade.

The platform that brings these devices together is Samsung SmartThings.  It renders each device as its digital twin, abstracting away the messiness of different vendors, protocols, hubs, clouds, apps - into one simple pane of glass.  Behind the scenes, a real-time platform maintains state and responds to events, generating real-time data about the state of your home.  It's consumer grade IOT.

My objective was to capture this event stream and store it for analysis, using the Azure platform. High level, the architecture looks like this:

{% include "postImage.html" src: "./images/architecture.png", alt: "Solution architecture diagram.", caption: "High level architecture" %}

The solution involves 4 components:

1. A [SmartApp]("https://smartthings.developer.samsung.com/docs/smartapps/smartapp-basics.html"), running in the Smartthings cloud, which would listen to and react to all events.
2. An [Azure Storage Queue]("https://docs.microsoft.com/en-us/azure/storage/queues/storage-queues-introduction"), where the SmartApp could deposit events as they happened.
3. An [Azure Function]("https://docs.microsoft.com/en-us/azure/azure-functions/functions-overview") that is triggered by new queue entries, and can run some code to process the event.
4. An [Azure Cosmos DB database]("https://docs.microsoft.com/en-us/azure/cosmos-db/introduction"), to permanently store the events and provide a platform for query and reporting later.

To build this, let's start by creating the Azure resources.

## Create the Azure Resources

Each of the following commands assume you're using a bash-like shell, and the [Azure CLI]("https://docs.microsoft.com/en-us/cli/azure/?view=azure-cli-latest").

Let's begin by settings some variables. Most of the defaults are fine, but please pay extra attention to these:

- **resourceGroupName**: the name of the resource group. To keep everything together, suggest creating a new one called _smartthings_ or similar.
- **storageName**: storage account name; must be globally unique.
- **region**: the location to host the resources. Run `az account list-locations --query '[].name'` for an updated list.
- **cosmosFreeTier**: Azure has a Cosmos [free tier]("https://docs.microsoft.com/en-ca/azure/cosmos-db/optimize-dev-test#azure-cosmos-db-free-tier"), but you only get one. If this is your first CosmosDB, set this to `true`.

```shell
# User Settings
resourceGroupName=smartthings
storageName=ststorageaccount$RANDOM
storageQueueName=stevents
functionAppName=qtocosmos$RANDOM
region=canadacentral
cosmosAccountName=cosmos$RANDOM
cosmosDBName=smarthome
cosmosContainer=stevents
cosmosFreeTier=false # if this is your first cosmos DB, set to true
```

In Azure, resources belong to a _resource group_, so let's create that first.

```shell
# Create a resource group.
az group create --name $resourceGroupName --location $region
```

Our first resource is a storage account. We use the _Standard_LRS_ sku for locally redundant data storage.

```shell
# Create an Azure storage account in the resource group.
az storage account create \
    --name $storageName \
    --location $region \
    --resource-group $resourceGroupName \
    --sku Standard_LRS
```

Commands further on will require access to the storage account. To facilitate that, let's extract the connection string and store it in a variable for re-use.

```shell
# Save the connection string for use later
storageConnectionString=$(az storage account show-connection-string \
    --resource-group $resourceGroupName \
    --name $storageName \
    --query connectionString \
    --output tsv)
```

The storage queue exists inside the storage account itself, and is designed to allow asynchronous event handling. As events are submitted to the queue, they're held there until another resource (our function) dequeues and processes them.

```shell
# Create a storage queue to receive smartthings events
az storage queue create \
    --name $storageQueueName \
    --account-name $storageName \
    --connection-string $storageConnectionString
```

SAS tokens are used to provide access to storage account resources outside Azure. In our case, the Smartthings platform will be using it to submit events to the queue. We create it with a long expiry (2099), and permissions to only (**a**)dd to the queue using _https_. The token is stored in a variable for output at the end of our build.

```shell
# Create a SAS token to adding to the queue
SASToken=$(az storage queue generate-sas \
    --name $storageQueueName \
    --account-name $storageName \
    --connection-string $storageConnectionString \
    --expiry 2099-01-01T00:00:00Z \
    --https-only \
    --permissions a \
    --output tsv)
```

Next up is the CosmosDB account. We'll choose the SQL API format, as it's universally understood and our data is structured with the same fields present in each record.

```shell
# Create a Cosmos account for SQL API
az cosmosdb create \
    --name $cosmosAccountName \
    --resource-group $resourceGroupName \
    --enable-free-tier $cosmosFreeTier
```

Later we'll be asking our function app to submit to Cosmos, and it will need a connection string to authenticate. Let's save it in a variable for now.

```shell
# Save the connection string for use later
cosmosDBConnection=$(az cosmosdb keys list \
    --type connection-strings \
    --name $cosmosAccountName \
    --resource-group $resourceGroupName \
    --query "connectionStrings[0].connectionString" --output tsv)
```

Create the database itself, inside the CosmosDB account.

```shell
# Create a SQL API database
az cosmosdb sql database create \
    --account-name $cosmosAccountName \
    --resource-group $resourceGroupName \
    --name $cosmosDBName
```

Next we create our function app. For now, this is just an empty container - it doesn't contain any code - since we haven't deployed yet.

```shell
# Create a function app
az functionapp create \
    --functions-version 3 \
    --resource-group $resourceGroupName \
    --consumption-plan-location $region \
    --runtime node \
    --runtime-version 12 \
    --name $functionAppName \
    --storage-account $storageName
```

Function apps support _application settings_, which are variables stored by the platform and available to apps at runtime. As our function app will be inserting rows into CosmosDB, we'll need to provide the connection, database and container information it needs.

```shell
# Set function app settings
az functionapp config appsettings set \
    --name $functionAppName \
    --resource-group $resourceGroupName \
    --settings ST_QUEUENAME=$storageQueueName \
                CosmosDBConnection=$cosmosDBConnection \
                CosmosDBName=$cosmosDBName \
                CosmosContainer=$cosmosContainer
```

Let's deploy the function code itself. This is a small bit of NodeJS code which accepts the incoming dequeued message (a Smartthings event), and inserts it as a row into CosmosDB.

The code is located in my [repo]("https://github.com/jschnurr/az-smartthings-logger"), in the `azurefunction` directory. It contains 2 files - `function.json` describing the input and output bindings (how it will be triggered, and what to do with the output), and `index.js`, which has the Javascript code for the function itself.

The deploy process will pull the code from the repo based on the _repo-url_ parameter. _manual-integration_ means we're only copying this code one-time; if the repo changes, your copy won't change.

```shell
# Add a function to move queue messages to Cosmos
az functionapp deployment source config \
    --name $functionAppName \
    --resource-group $resourceGroupName \
    --repo-url https://github.com/jschnurr/az-smartthings-logger \
    --manual-integration
```

---

Congratulations! Your Azure environment is all set-up and ready to go.

Let's test it out! Push a message onto the storage queue, and then pop into the [Azure Portal]("https://portal.azure.com/#home") to see the message in CosmosDB!

```shell
    # Test it out! Put a message on storage queue, should end up in Cosmos
    testtext=$(echo "{\"test\":\"test\"}" | base64)
    az storage message put \
      --content $testtext \
      --queue-name $storageQueueName \
      --account-name $storageName \
      --connection-string $storageConnectionString
```

{% include "postImage.html" src: "./images/image.png", caption: "Test message as viewed in CosmosDB, after being processed by our pipeline." %}

Lastly, there is some information you'll need for the next step. Save this information before closing your terminal.

```shell
# Output required settings for the Smartthings SmartApp
echo -e "\n\n-------------------\nSMARTTHINGS SETTINGS:\n \
  Queue: $storageQueueName\n \
  SASToken: $SASToken\n \
  StorageAccount: $storageName \
  \n\n"
```

{% include "postImage.html" src: "./images/image-1.png", caption: "" %}

Save this - you'll need it to configure Smartthings.

---

## Create the SmartApp

The following instructions borrow heavily from [Sam Cogan]("https://samcogan.com/stream-smartthings-data-to-cosmos-db-and-powerbi/").

There are 4 steps required:

1. Add my [repo]("https://github.com/jschnurr/az-smartthings-logger") to _My SmartApps_ dashboard on [account.smartthings.com]("https://account.smartthings.com/"). This makes the repo available in _Update from Repo_ as a source.
2. Use _Update from Repo_ to select the `st-queue.groovy` file, and _Execute Update_ with _Publish_ checked to import the code and create a new SmartApp.
3. Configure the _App Settings_ to point to the Azure storage queue.
4. Add the SmartApp to the Smartthings mobile app, and authorize it to receive data.

### Add the repo

Navigate to the Smartthings web-based IDE at [https://account.smartthings.com]("https://account.smartthings.com") and log in with your Samsung credentials.

Click on settings:

{% include "postImage.html" src: "./images/image-5.png", caption: "Settings in the Smartthings IDE" %}

Add a Github repository:

- Owner: `jschnurr`
- Name: `az-smartthings-logger`
- Branch: `master`

{% include "postImage.html" src: "./images/image-2.png", caption: "Add Github Repo" %}

### Update from Repo

Select the _Update from Repo_ button, and choose the `az-smartthings-logger` repo we just added.

{% include "postImage.html" src: "./images/image-6.png", caption: "Update from repo menu" %}

In the resulting screen, you'll be prompted to create a new SmartApp based on the repo. Select \`jschnurr:ST-Queue under _New (only in GitHub)_, check _Publish_, and click _Execute Update_.

{% include "postImage.html" src: "./images/image-7.png", caption: "Update from repo" %}

Once this completes, you should see the new SmartApp under _My SmartApps_ in the IDE.

{% include "postImage.html" src: "./images/image-3.png", caption: "My SmartApps in the IDE" %}

The SmartApp is now installed.

### Configure the App Settings

The app needs to know how to connect to our Azure storage queue. Remember those Smartthings Settings you stored safely in the last section? We need those now.

On the _My SmartApps_ screen, click the _edit properties_ button next to jschnurr:ST-Queue.

{% include "postImage.html" src: "./images/image-8.png", caption: "Edit properties button" %}

The _edit properties_ dialog appears. Fill in the values from the last section, and click _Update_.

{% include "postImage.html" src: "./images/image-9.png", caption: "Edit Properties dialog" %}

### Add the app in the Smartthings Mobile App

For the app to receive events and process data, it needs to be authorised. This is done with the Smartthings mobile app.

After adding the app itself, you can select which devices you would like to send data for. Only selected devices will emit events and be sent to Azure by the SmartApp.

See the flow in the images below.

{% include "postImage.html" src: "./images/image-10.png", caption: "Device screens to add and configure the SmartApp" %}

---

## Conclusion

That's it! At this point, any events triggered by the devices you selected in the app will be propagated through to Azure, and end up in CosmosDB.

In a later post, we'll take a look at the insights you can extract from the data.  Enjoy!
