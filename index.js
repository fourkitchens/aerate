#!/usr/bin/env node

const wpt = require('./wpt');

module.exports = options => wpt.wpt(options);

// eslint-disable-next-line
function sift(options) {
  wpt.wpt(options);
}
