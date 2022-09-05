module.exports = {
  // Explicit !== false check so we don't need to enable it by default
  enableDesignMode: process.env.ELEVENTY_ENV === 'development',
};
