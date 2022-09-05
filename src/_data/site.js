const environmentSpecificVariables = {
  development: {
    // FIXME: don't hardcode port
    url: 'http://localhost:4001',
  },
  production: {
    url: 'https://jeffsidea.com',
  },
};

module.exports = {
  title: '@jeffsidea',
  author: 'Jeff Schnurr',
  email: 'jschnurr@gmail.com',
  description: 'A blog about cloud, code and innovation at enterprise scale.',
  keywords: ['Jeff Schnurr'],
  lang: 'en-US',
  pagination: {
    itemsPerPage: 21,
  },
  disqusShortname: 'jeffsidea',
  gtag: 'UA-19292326-1',
  ...environmentSpecificVariables[process.env.ELEVENTY_ENV],
};
