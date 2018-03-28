const path = require("path");

const config = {
  snapPath: path.join(__dirname, "/snappy"),
  platformName: "web",
  ignoredStories: [],
  breakpoints: [520]
};

module.exports = config;
