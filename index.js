#!/usr/bin/env node

var wpt = require("./wpt");

exports = module.exports = sift;

function sift (options) {
  wpt.wpt(options)
}
