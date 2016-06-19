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
SUMMARY_MAX_LENGTH = 100

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

ARTICLE_URL = '{date:%Y}/{date:%m}/{slug}/'
ARTICLE_SAVE_AS = '{date:%Y}/{date:%m}/{slug}/index.html'

# Social widget
SOCIAL = (('Twitter', 'http://www.twitter.com/jeffsidea'),
          ('LinkedIn', 'https://ca.linkedin.com/in/schnurr'),
          ('GitHub', 'https://github.com/jschnurr'),
          ('Facebook', 'https://www.facebook.com/jschnurr'), )
GITHUB_URL = 'https://github.com/jschnurr'

DEFAULT_PAGINATION = 10
DEFAULT_CATEGORY = 'General'
SHOW_ARTICLE_CATEGORY = True
SLUGIFY_SOURCE = 'title'
DISPLAY_CATEGORIES_ON_SIDEBAR = True

DIRECT_TEMPLATES = ('index', 'categories', 'tags', 'archives', 'search')
PLUGIN_PATHS = ['../pelican-plugins']
# tipue_search disabled until I can fix the package to add loc
PLUGINS = ['sitemap', 'related_posts']

# STATIC_PATHS = ['images',]
# ARTICLE_PATHS = ['older', '2016']

# Theme config
THEME = 'theme'
BOOTSTRAP_THEME = 'cosmo'

# DISPLAY_PAGES_ON_MENU
DISPLAY_CATEGORIES_ON_MENU = False
PYGMENTS_STYLE = 'colorful'
BOOTSTRAP_FLUID = False
DISPLAY_ARTICLE_INFO_ON_INDEX = True
ADDTHIS_PROFILE = 'ra-5761ffa09e14ce18'
TWITTER_USERNAME = 'jeffsidea'
TWITTER_WIDGET_ID = '663435651132489728'

ABOUT_ME = '''Innovation Lab Director in Waterloo, Canada. Ignites ideas through technology and design.
            <div id=twitter-follow>
            <a class="twitter-follow-button"
            href="https://twitter.com/jeffsidea"
            data-size="large">
            Follow @jeffsidea</a>
            </div>'''
AVATAR = '/images/jschnurr-profile-300x200.jpg'

# clean-summary plugin
CLEAN_SUMMARY_MAXIMUM = 0  # maximum number of images in your summary
CLEAN_SUMMARY_MINIMUM_ONE = True  # add first image if summary doesn't have one

# sitemap plugin
SITEMAP = {
    'format': 'xml',
    'priorities': {
        'articles': 0.5,
        'indexes': 0.5,
        'pages': 0.5
    },
    'changefreqs': {
        'articles': 'monthly',
        'indexes': 'daily',
        'pages': 'monthly'
    }
}
