#!/usr/bin/env node

const wpt = require('./wpt');

exports = module.exports = sift;

function sift(options) {
  wpt.wpt(options);
}
