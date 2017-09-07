#!/usr/bin/env node

// wpt.js
var sift = require("./wpt");
var config = require('./config.json');

sift.wpt(config);
