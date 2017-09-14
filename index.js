#!/usr/bin/env node

// wpt.js
var wpt = require("./wpt");
var budget = require('./budget');

exports = module.exports = sift;

function sift (options) {
  wpt.wpt(budget, options)
}
