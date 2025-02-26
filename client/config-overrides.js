module.exports = function override(config) {
    config.resolve.alias = {
      ...config.resolve.alias,
      "node:stream/web": require.resolve("web-streams-polyfill"),
    };
    return config;
  };
  