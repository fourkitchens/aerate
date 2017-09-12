#!/usr/bin/env node

// wpt.js
var wpt = require("./wpt");
var config = require('./config.json');

exports = module.exports = sift;

function sift (options) {
  wpt.wpt(config, options)
}
