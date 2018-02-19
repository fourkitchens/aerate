#!/usr/bin/env node

var wpt = require("./wpt");

exports = module.exports = sift;

function sift (options) {
  wpt.wpt(options)
}

sift({
  key: 'A.82807ee5a9e7dce9e3a3cdee30f01567',
  tests: [
    {
      name: 'Google.com',
      url: 'http://google.com',
      type: 'homepage'
    }
  ]
});
