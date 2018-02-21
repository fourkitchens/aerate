#!/usr/bin/env node

const wpt = require('./wpt');

exports = module.exports = sift;

function sift(options) {
  wpt.wpt(options);
}

sift({
  key: 'A.0d267d8f8a0ce4a79c5c4a5a5415221b',
  tests: [
    {
      name: 'Google.com',
      url: 'http://google.com',
      type: 'homepage',
    },
  ],
  count: 1,
  ui: true,
});
