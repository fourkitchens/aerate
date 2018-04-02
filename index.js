#!/usr/bin/env node

const wpt = require("./wpt");

function aerate(options) {
  // eslint-disable-line
  wpt.wpt(options);
}

aerate({
  key: "A.0d267d8f8a0ce4a79c5c4a5a5415221b",
  tests: [
    {
      name: "Google.com",
      url: "http://google.com",
      type: "homepage"
    },
    {
      name: "Yahoo.com",
      url: "https://www.yahoo.com/",
      type: "homepage"
    },
    {
      name: "Bing.com",
      url: "https://www.bing.com/",
      type: "homepage"
    }
  ],
  count: 1,
  ui: true
});
