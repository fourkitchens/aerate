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

var wptRun = (options, tunnel) => {
  wpt.run({
    key: options.key,
    tests: options.tests,
    mapper: 'siftmap',
    connection: options.connection || 'Mobile LTE',
    count: options.count || 6,
    ui: options.ui || true,
  }).then(function (mapped) {
    if (tunnel) {
      tunnel.close();
    }
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
    if (tunnel) {
      tunnel.close();
    }
  });
}

exports.wpt = (options) => {
  if (options.localPort) {
    const localtunnel = require('localtunnel');

    const tunnel = localtunnel(options.localPort, function(err, tunnel) {
        if (err) {
          console.log(err);
        }
        Object.values(options.tests).forEach(i => {
          i.url = tunnel.url + i.url;
        });

        wptRun(options, tunnel);
    });
  }
  else {
    wptRun(options);
  }
}
