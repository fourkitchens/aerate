#!/usr/bin/env node

const wpt = require('./wpt');

function aerate(options) {
  wpt.wpt(options);
}

exports = module.exports = aerate; // eslint-disable-line
