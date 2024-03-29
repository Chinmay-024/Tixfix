assetPrefix: "./";
module.exports = {
  webpackDevMiddleware: (config) => {
    config.watchOptions.poll = 300;
    return config;
  },
  env: {
    STRIPE_KEY: process.env.STRIPE_KEY,
  },
};
