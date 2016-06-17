Title: 3 ways that Hadoop can improve customer service
Date: 2014-12-26 15:35
Author: admin
Category: Tools
Slug: 3-ways-that-hadoop-can-improve-customer-service
Status: published

I've recently started to learn
[Hadoop](http://readwrite.com/2013/05/23/hadoop-what-it-is-and-how-it-works).

Like many technology professionals, I've grown up wrangling data with
Python scripts, SQL databases and Excel.  However, modern datasets make
that process feel quaint; it's not just that the data is 'big', it's
increasingly unstructured and dispersed across many systems.  It's also
loaded with potential - to not only understand your customer today, but
to anticipate what they might do tomorrow.

Consider the data sources available in a modern contact center:

-   ACD feeds (queue performance, agent activity, handle times, etc)
-   Interaction content (chat transcripts, customer emails and
    transcribed voice calls)
-   QA records (interaction quality)
-   CRM records (contact information, activity history, service tickets,
    past sales)
-   Customer Satisfaction Surveys (comments, sentiment)
-   Knowledgebase (content utilization, effectiveness)
-   Web site (click-paths, shopping cart, engagement)
-   Social Media (comments, sentiment)
-   Product Reviews (at every point of sale)

... and more!

Imagine the value that is locked inside this data, as a whole:

-   Is my sales lead likely to have costly service requirements
    post-sale?
-   Which customers are most likely to post negative comments on social
    media?
-   Has an Amazon 'top reviewer' been in live chat with our sales team?
-   Which keywords or concepts in our support calls are the best
    predictor of customer satisfaction?
-   What agent behaviors drive customers to advocate our brand online?

Unlocking these answers can be challenging.  The data is in many
different places, and has poorly defined structure.

Hadoop doesn't solve every aspect of this problem, but it brings some
important capabilities to the table:

1.  **Keep everything.**  Hadoop stores files in
    [HDFS](http://www.ibm.com/developerworks/library/wa-introhdfs/) -
    The Hadoop Distributed File System.  The benefit of that your files
    are stored across multiple systems, and you can add more as you grow
    - without slowing the system down.  This encourages a "keep
    everything" mentality, where the raw source data is kept forever.
     You can consolidate and summarize it too, if you like - but never
    delete.  That raw data could be useful for some future purpose, so
    keep it.
2.  **Manage data flows.**  Getting a useful business output from
    complex datasets often requires an 'assembly line' of sorts, to
    ingest the original sources, scrub, transform and relate them to one
    another, and finally push the analyze-ready output to someone who
    can load it into Excel and do something useful with it.  In Hadoop,
    components like [Oozie](http://oozie.apache.org/) and
    [Falcon](http://hortonworks.com/hadoop/falcon/) provide the
    framework necessary to build the assembly line, with all of the
    redundancy, fault-tolerance and parallel processing you would
    expect.
3.  **Machine learning.**  The potential of big data is truly unleashed
    when past data can predict, or even influence, future events.
     Machine learning can help, with components like
    [Mahout](http://mahout.apache.org/) providing the tools to do so
    without complex and expensive development work.  Use it to drive
    recommendation engines on your website, or intelligent routing of
    your sales leads and service interactions.

The '[data lake](http://en.wiktionary.org/wiki/data_lake)' metaphor
resonates with me.  Conceptually, Hadoop embraces the idea that your
data is big, messy and always changing.  The more we add to the lake,
the more rich and valuable the entire ecosystem becomes.

I'll provide updates as I learn more.  For now, I'm excited by the
potential - for the business, and for the customer.  Service gets
smarter when it's powered by big data.
