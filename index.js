#!/usr/bin/env node

const wpt = require("./wpt");

function aerate(options) {
  // eslint-disable-line
  wpt.wpt(options);
}

exports = module.exports = aerate; // eslint-disable-line
