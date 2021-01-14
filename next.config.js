const path = require("path");

require("dotenv").config();

module.exports = {
  env: {
    SITE_CLIENT_ID: process.env.SITE_CLIENT_ID,
    REALM_NAME: process.env.REALM_NAME,
    REDIRECT_URI: process.env.REDIRECT_URI,
  },
  webpack: (config) => {
    // config.resolve.alias["@forestryio"] = path.resolve(
    //   "/Users/jeffsee/code/graphql-demo/packages"
    // );
    // config.resolve.alias["@tinacms"] = path.resolve("./node_modules/@tinacms");
    // config.resolve.alias["tinacms"] = require.resolve("tinacms");
    // config.resolve.alias["tinacms"] = path.resolve(
    //   "/Users/jeffsee/code/tinacms/packages/tinacms"
    // );
    config.resolve.alias["react-dom"] = require.resolve("react-dom");
    config.resolve.alias["react"] = require.resolve("react");

    return config;
  },
};
