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

const wptRun = (options, ngrok, url) => {
  wpt.fetch({
    key: options.key,
    tests: options.tests,
    connection: options.connection || 'Mobile LTE',
    count: options.count || 9
  }).then(function (result) {
    // For each test.
    result.data.forEach(function (datum, index) {
      const table = new Table({
        head: ['Test', 'Budget', 'Result', 'Pass/Fail'],
        chars: { 'top': '═' , 'top-mid': '╤' , 'top-left': '╔' , 'top-right': '╗'
               , 'bottom': '═' , 'bottom-mid': '╧' , 'bottom-left': '╚' , 'bottom-right': '╝'
               , 'left': '║' , 'left-mid': '╟' , 'mid': '─' , 'mid-mid': '┼'
               , 'right': '║' , 'right-mid': '╢' , 'middle': '│' },
        style: {
          head: ['cyan']
        }
      });
      // if there are not errors in the request to webpagetest.org.
      if (!datum.error) {
        // For each budget item.
        Object.keys(budget).forEach(key => {
          var result = '';
          var budgetValue = '';
          var grade = '';
          const gradeCheck = () => {
            if (budget[key].value && result > budget[key].value) {
              grade = 'FAIL';
            }
            else {
              grade = 'Pass';
            }
          }
          switch (key) {
            case 'requests':
            case 'connections':
              result = datum.render.data.median.firstView[key];
              budgetValue = budget[key].value;
              var formattedResult = result;
              break;
            case 'bytes':
              result = datum.render.data.median.firstView.bytesIn;
              budgetValue = budget[key].value;
              var formattedResult = result;
              break;
            case 'firstByte':
              result = datum.render.data.median.firstView.TTFB;
              budgetValue = budget[key].value + ' ms';
              gradeCheck();
              var formattedResult = result + ' ms';
              break;
            case 'startRender':
              result = datum.render.data.median.firstView.render;
              budgetValue = budget[key].value + ' ms';
              gradeCheck();
              var formattedResult = result + ' ms';
              break;
            case 'speedIndex':
              result = datum.render.data.median.firstView.SpeedIndex;
              budgetValue = budget[key].value + ' ms';
              gradeCheck();
              var formattedResult = result + ' ms';
              break;
            case 'docTime':
              result = datum.render.data.median.firstView.docTime;
              budgetValue = budget[key].value + ' ms';
              gradeCheck();
              var formattedResult = result + ' ms';
              break;
            case 'load':
              result = datum.render.data.median.firstView.loadTime;
              budgetValue = budget[key].value + ' ms';
              gradeCheck();
              var formattedResult = result + ' ms';
          }
          table.push(
            [budget[key].name, budgetValue, formattedResult.toLocaleString(), grade],
          );
        });
        return console.log('-------------------------------------------------' + '\n' + '\n' + 'Sift Results for ' + options.tests[index].name + ':' + '\n' + table.toString());
      }
      console.log('Test failed, reason: ' + datum.error.message);
    });

    // If UI
    if (options.ui == true) {
      wpt.map({
        mapper: 'siftmap'
      }, result).then(function (mapped) {
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

    // If local environment.
    if (ngrok) { ngrok.kill(); }
  });
}

exports.wpt = (options) => {
  if (options.localPort) {
    var ngrok = require('ngrok');

    ngrok.connect(options.localPort, function (err, url) {
      if (err) {
        console.log(err);
      }
      Object.values(options.tests).forEach(i => {
        i.url = url + i.url;
      });
      console.log(url);

      wptRun(options, ngrok, url);
    });
  }
  else {
    wptRun(options);
  }
}
