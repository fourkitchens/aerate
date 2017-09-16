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

exports.wpt = (budget, options) => {
  wpt.run({
    key: options.key,
    tests: options.test,
    mapper: 'siftmap',
    connection: options.connection || 'Mobile LTE',
    count: options.count || 6,
    ui: options.ui || true,
  }).then(function (mapped) {
    fs.writeFileSync(path.join(__dirname, 'results.html'), mapped);
    browserSync.init({
      server: {
        baseDir: __dirname,
      },
      startPath: './results.html',
      ui: false,
      open: true,
      port: openPort,
      });
  }).catch(function (error) {
    console.log(error.stack);
  });
}
