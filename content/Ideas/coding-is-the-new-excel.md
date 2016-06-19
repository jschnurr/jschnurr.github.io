Title: Coding is the new Excel
Date: 2015-10-04 16:06
Tags: coding,skills
Status: published

Data is `everywhere`. We're surrounded by machines that track, measure,
sample, record and save everything. Translating that data into useful
insight - well that's the hard part, and most business leaders today are
not equipped to do it themselves.

Before spreadsheets, large financial computations were the domain
of accounting experts, while business users awaited summarized reports
on which to base decisions. Today, anybody can use Microsoft Excel to
rework information provided in a variety of formats, and build
spreadsheets that support most decision making themselves. In fact,
such an ability has become an expected norm among managers.

Today, the *big data* that surrounds us can feel as impenetrable as
that finance data once was. It's too unstructured for Excel, and too
dispersed to provide an integrated view. So what does a manager do? 
They call IT, and await summarized Excel sheets on which they can base
decisions. It's like 1985, but IT are the accountants.

While the tools to transform data are improving, I submit that
***coding*** is to big data what ***Excel*** was to finance. If you want to
capture opportunities, make quick decisions, and reduce your dependency
on somebody else to be successful - you have to be able to code.

> Coding is to big data what Excel was to finance.

I'm not talking about coding aeronautical software for space flight, or
even building the next Facebook - I mean basic data transformation and
analysis.

For example, I wanted to segment our customer satisfaction data by
product category, but there was no such field in the dataset. To get
there, I wrote a Python script that performed 5 steps:

1.  For each survey result, identify the CRM case related to it
2.  Query CRM to get the case notes
3.  Find the product identifier in the case
4.  Query the product database to determine what category the product
    belongs to
5.  Output the original survey data to a new file, adding extra columns
    to indicate product and category

The new file loaded into Excel, and a quick pivot table generated my
answer.

What does this process look like, if you can't do it yourself?

My opinion is that `if you're in business, you need to learn how to code.`
You don't have a choice. It's the Excel of the 21st century.

What do you think?
