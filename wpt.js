/* globals require */
'use strict';

const wpt = require('webpagetest-mapper');
const path = require('path');
const fs = require('fs');
const opn = require('opn');
const portscanner = require('portscanner');
const browserSync = require('browser-sync').create();

var exports = module.exports = {};

// Find open port using portscanner.
let openPort = '';
portscanner.findAPortNotInUse(3000, 3010, '127.0.0.1', (error, port) => {
  openPort = port;
});

exports.wpt = (config) => {
  wpt.run({
    key: config.key,
    tests: config.test,
    mapper: 'sift',
    connection: "Mobile LTE",
    count: 6,
  }).then(function (mapped) {
    fs.writeFileSync(path.join(__dirname, 'results.html'), mapped);
    browserSync.init({
      server: {
        baseDir: './',
      },
      startPath: '/results.html',
      ui: false,
      open: true,
      port: openPort,
      });
  }).catch(function (error) {
    console.log(error.stack);
  });
}
