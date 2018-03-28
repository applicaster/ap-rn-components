const jestConfigurator = require("@ap-rn-components/jest-configurator").default;

module.exports = jestConfigurator("ios", __dirname, ["gestures.js"]);
