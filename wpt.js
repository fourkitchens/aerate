/* globals require */
'use strict';

const wpt = require('webpagetest-mapper');
const path = require('path');
const fs = require('fs');
const opn = require('opn');
const portscanner = require('portscanner');
const browserSync = require('browser-sync').create();
const Table = require('cli-table');

if (fs.existsSync(process.env.PWD + '/budget.json')) {
  var budget = require(process.env.PWD + '/budget.json');
}
else {
  var budget = require('./budget');
}

var exports = module.exports = {};

// Find open port using portscanner.
let openPort = '';
portscanner.findAPortNotInUse(3000, 3010, '127.0.0.1', (error, port) => {
  openPort = port;
});

exports.wpt = (options) => {
  // If UI is false
  if (options.ui == true) {
    wpt.run({
      key: options.key,
      tests: options.tests,
      mapper: 'siftmap',
      connection: options.connection || 'Mobile LTE',
      count: options.count || 9,
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
  else {
    wpt.fetch({
      key: options.key,
      tests: options.tests,
      connection: options.connection || 'Mobile LTE',
      count: options.count || 9,
      silent: true,
    }).then(function (result) {
      result.data.forEach(function (datum, index) {
        const table = new Table({
          head: ['Test', 'Result'],
          chars: { 'top': '═' , 'top-mid': '╤' , 'top-left': '╔' , 'top-right': '╗'
                 , 'bottom': '═' , 'bottom-mid': '╧' , 'bottom-left': '╚' , 'bottom-right': '╝'
                 , 'left': '║' , 'left-mid': '╟' , 'mid': '─' , 'mid-mid': '┼'
                 , 'right': '║' , 'right-mid': '╢' , 'middle': '│' },
          style: {
            head: ['cyan']
          }
        });
        if (!datum.error) {
          Object.keys(budget).forEach(key => {
            var result = '';
            switch (key) {
              case 'requests':
              case 'connections':
                result = datum.render.data.median.firstView[key];
                break;
              case 'bytes':
                result = datum.render.data.median.firstView.bytesIn;
                break;
              case 'firstByte':
                result = datum.render.data.median.firstView.TTFB;
                break;
              case 'startRender':
                result = datum.render.data.median.firstView.render;
                break;
              case 'speedIndex':
                result = datum.render.data.median.firstView.SpeedIndex;
                break;
              case 'docTime':
                result = datum.render.data.median.firstView.docTime;
                break;
              case 'load':
                result = datum.render.data.median.firstView.loadTime;
            }
            table.push(
              [budget[key].name, result.toLocaleString()],
            );
          });
          return console.log('-------------------------------------------------' + '\n' + '\n' + 'Sift Results for ' + options.tests[index].name + ':' + '\n' + table.toString());
        }
        console.log('Test failed, reason: ' + datum.error.message);
      });
    });
  }
}
