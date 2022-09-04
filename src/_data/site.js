const environmentSpecificVariables = {
  development: {
    url: 'http://localhost:8080',
  },
  production: {
    url: 'https://jeffsidea.com',
  },
};

module.exports = {
  title: '@jeffsidea',
  author: 'Jeff Schnurr',
  email: 'jschnurr@gmail.com',
  description: 'Innovation, technology and code.',
  keywords: [],
  language: 'en-US',
  favicon: {
    widths: [32, 57, 76, 96, 128, 192, 228],
    format: 'png',
  },
  ...environmentSpecificVariables[process.env.ELEVENTY_ENV],
};
