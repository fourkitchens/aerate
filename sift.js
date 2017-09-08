#!/usr/bin/env node

'use strict';

// wpt.js
var sift = require("./wpt");
var config = require('./config.json');

var exports = module.exports = {};

exports.sift = {
  run: run
};

/**
 * Public function `run`.
 *
 * Invokes Sift and passes options
 *
 * @option key        {string}  WebPageTest API key.
 * @option connection {string}  WebPageTest connection speed, defaults to
 *                              `Mobile LTE`.
 * @option tests      {string}  Path to the test definitions JSON file, defaults
 *                              to `tests.json`.
 * @option count      {number}  Number of times to run each test, defaults to
 *                              `9`.
 * @option email      {string}  Email address to send notifications to.
 * @option ui       {boolean}  If true, it will open up the UI in a browser,
 *                              defaults to true
 */
function run (config) {
  sift.wpt(config);
}

sift.run();
