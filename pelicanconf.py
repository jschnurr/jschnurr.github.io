#!/usr/bin/env python
# -*- coding: utf-8 -*- #
from __future__ import unicode_literals

AUTHOR = u'Jeff Schnurr'
SITENAME = u'jeffsidea.com'
SITEURL = ''
# SITELOGO = 'images/jeffsidea-01.png'
# SITELOGO_SIZE = '40'
BANNER = 'images/jeffsidea-02.png'
BANNER_ALL_PAGES = False
FAVICON = 'images/favicon.png'
HIDE_SITENAME = False
SUMMARY_MAX_LENGTH = 150

# can be useful in development, but set to False when you're ready to publish
RELATIVE_URLS = True

PATH = 'content'

TIMEZONE = 'America/Toronto'

DEFAULT_LANG = u'en'

# development setting
LOAD_CONTENT_CACHE = False

# Feed generation is usually not desired when developing
FEED_ALL_ATOM = None
CATEGORY_FEED_ATOM = None
TRANSLATION_FEED_ATOM = None
AUTHOR_FEED_ATOM = None
AUTHOR_FEED_RSS = None

# Social widget
SOCIAL = (('Twitter', 'http://www.twitter.com/jeffsidea'),
          ('LinkedIn', 'https://ca.linkedin.com/in/schnurr'),
          ('GitHub', 'https://github.com/jschnurr'),
          ('Facebook', 'https://www.facebook.com/jschnurr'),)

DEFAULT_PAGINATION = 10

# Uncomment following line if you want document-relative URLs when developing
#RELATIVE_URLS = True

DIRECT_TEMPLATES = ('index', 'categories', 'tags', 'archives', 'search')
PLUGIN_PATHS = ['plugins']
PLUGINS = ['tipue_search','tag_cloud']

# Theme config
THEME='theme'
BOOTSTRAP_THEME='cosmo'

# DISPLAY_PAGES_ON_MENU
DISPLAY_CATEGORIES_ON_MENU = False
# GOOGLE_ANALYTICS (classic tracking code)
# GOOGLE_ANALYTICS_UNIVERSAL and GOOGLE_ANALYTICS_UNIVERSAL_PROPERTY (Universal tracking code)
# DISQUS_SITENAME
PYGMENTS_STYLE='colorful'
BOOTSTRAP_FLUID=False
DISPLAY_ARTICLE_INFO_ON_INDEX = True
ADDTHIS_PROFILE='ra-5761ffa09e14ce18'
TWITTER_USERNAME='jeffsidea'
TWITTER_WIDGET_ID='663435651132489728'

TAG_CLOUD_STEPS = 4
TAG_CLOUD_MAX_ITEMS = 100
TAG_CLOUD_SORTING = 'random'
TAG_CLOUD_BADGE = True

ABOUT_ME = 'Innovation Lab Director in Waterloo. Ignites ideas through technology and design.'
AVATAR = 'images/jschnurr-profile-300x200.jpg'
