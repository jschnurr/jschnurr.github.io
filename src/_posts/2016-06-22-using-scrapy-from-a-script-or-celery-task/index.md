---
title: Using Scrapy from a script or celery task
description: The Scrapy framework is a powerful Python package for web scraping. Reduce the overhead and run it as a script.
# keywords: [wsl 2, memory, ram, memory usage]
categories: [python, scrapy, oss]
# lastUpdated: 2022-08-07
---

[Scrapy](http://scrapy.org) is a web scraping framework for Python. If you followed
the [tutorial](http://doc.scrapy.org/en/latest/intro/tutorial.html), the steps include
creating a project, defining an item, writing a spider, and initiating a crawl from
the command line.

This method is fine for a large scraping project, but what if you'd like to scrape
some web content from within another application, or spawn a Celery task to do so
asynchronously? The [documentation](http://doc.scrapy.org/en/latest/topics/practices.html#run-scrapy-from-a-script)
describes a method to run scrapy from a script, but I found the need to use
`CrawlerProcess` and `Twisted` to be more complex than it should be. Similarly, a Google
search turns up various methods using the multiprocessing library, but they
can be difficult to follow, and often won't work with Celery because it doesn't
like subprocesses.

To simplify things, I created a package called `scrapyscript`, and made it
available on [Pypi](https://pypi.python.org/pypi/scrapyscript). The source is on
[Github](https://github.com/jschnurr/scrapyscript). It works on Python 2.7 and 3.4.

To use it, you first need to define an instance of `scrapy.spiders.Spider`. For example,
this code instructs Scrapy to retrieve `www.python.org`, parse out the title using
the xpath syntax `//title/text()`, `extract()` the text itself, and return the result
as a Python dictionary. Of course, your spider could be as complex as you like, limited
only by the capabilties of Scrapy itself.

This example also makes use of the `payload` option, which is explained later.

```python
from scrapy.spiders import Spider

class PythonSpider(Spider):
    name = 'myspider'
    start_urls = ['http://www.python.org']

    def parse(self, response):
        title = response.xpath('//title/text()').extract()
        if self.payload:
           mantra = self.payload.get('mantra', None)
        else:
            mantra = None
        return {'title': title,
                'mantra': mantra}

spider = PythonSpider()
```

Optionally, you can create an instance of `scrapy.settings.Settings`, to further
customize how Scrapy will behave. Otherwise, scrapyscript will use Scrapy's
default values.

Let's define `settings` to specify a user agent.

```python
from scrapy.settings import Settings
settings = Settings()
settings.set('USER_AGENT',
'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/50.0.2661.86 Safari/537.36')
```

### Jobs

Next, we need to define one or more instances of `scrapyscript.Job`. Jobs contain your spider,
and any data (payload) you would like to pass into the running instance.

#### Basic Job

```python
basicjob = Job(spider)
```

#### Passing an object

To make extra data available in the running spider, add it to the job using the payload kwarg.

```python
jobwithdata = Job(spider,
                  payload={'mantra': 'Simple is better than complex.'})  # availabe in spider as self.payload
```

### Processor

We have now defined two jobs - `basicjob` and `jobwithdata`. To start Scrapy and run these jobs,
we need to instantiate an instance of `scrapyscript.Processor`, call the `run` method, and pass
them in as a list.

Optionally, you can supply settings. Since we've defined them, we'll pass them in.

```python
Processor(settings=settings).run([basicjob, jobwithdata])

#    [{'mantra': None, 'title': ['Welcome to Python.org']},
#     {'mantra': 'Simple is better than complex.',
#      'title': ['Welcome to Python.org']}]
```

### How does it work?

scrapyscript uses a fork of the Multiprocessing library to create a process, launch a twisted reactor,
and run the spiders in Scrapy. All Jobs are run in parallel, and the process blocks until all
are complete. The results come back as a list, as you can see above.

### Using Celery

In part 2, I'll walk through the process of using scrapyscript in a Celery worker.

### Complete Code

For your convenience, here is the full example.

```python
from scrapy.spiders import Spider
from scrapy.settings import Settings

class PythonSpider(Spider):
    name = 'myspider'
    start_urls = ['http://www.python.org']

    def parse(self, response):
        title = response.xpath('//title/text()').extract()
        if self.payload:
           mantra = self.payload.get('mantra', None)
        else:
            mantra = None
        return {'title': title,
                'mantra': mantra}

spider = PythonSpider()

settings = Settings()
settings.set('USER_AGENT',
'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/50.0.2661.86 Safari/537.36')

basicjob = Job(spider)
jobwithdata = Job(spider,
                  payload={'mantra': 'Simple is better than complex.'})  # availabe in spider as self.payload

Processor(settings=settings).run([basicjob, jobwithdata])
```
