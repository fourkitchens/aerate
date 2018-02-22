/* globals require */

const wpt = require('webpagetest-mapper');
const path = require('path');
const fs = require('fs');
const portscanner = require('portscanner');
const browserSync = require('browser-sync').create();
const Table = require('cli-table');
let budget = require('./budget');

if (fs.existsSync(`${process.env.PWD}/budget.json`)) {
  budget = require(`${process.env.PWD}/budget.json`); // eslint-disable-line
}

var exports = (module.exports = {}); // eslint-disable-line

// Find open port using portscanner.
let openPort = '';
portscanner.findAPortNotInUse(3000, 3010, '127.0.0.1', (error, port) => {
  openPort = port;
});

const wptRun = (options, ngrok) => {
  wpt
    .fetch({
      key: options.key,
      tests: options.tests,
      connection: options.connection || 'Mobile LTE',
      count: options.count || 9
    })
    .then(result => {
      // For each test.
      result.data.forEach((datum, index) => {
        // eslint-disable-line
        const table = new Table({
          head: ['Test', 'Budget', 'Result', 'Pass/Fail'],
          chars: {
            top: '═',
            'top-mid': '╤',
            'top-left': '╔',
            'top-right': '╗',
            bottom: '═',
            'bottom-mid': '╧',
            'bottom-left': '╚',
            'bottom-right': '╝',
            left: '║',
            'left-mid': '╟',
            mid: '─',
            'mid-mid': '┼',
            right: '║',
            'right-mid': '╢',
            middle: '│'
          },
          style: {
            head: ['cyan']
          }
        });
        // if there are not errors in the request to webpagetest.org.
        if (!datum.error) {
          // For each budget item.
          Object.keys(budget).forEach(key => {
            let resultValue = '';
            let budgetValue = '';
            let grade = '';
            let formattedResult = '';
            const gradeCheck = () => {
              if (budget[key].value && resultValue > budget[key].value) {
                grade = 'FAIL';
              } else {
                grade = 'Pass';
              }
            };
            switch (key) {
              case 'requests':
              case 'connections':
                resultValue = datum.render.data.median.firstView[key];
                budgetValue = budget[key].value;
                formattedResult = resultValue;
                break;
              case 'bytes':
                resultValue = datum.render.data.median.firstView.bytesIn;
                budgetValue = budget[key].value;
                formattedResult = resultValue;
                break;
              case 'firstByte':
                resultValue = datum.render.data.median.firstView.TTFB;
                budgetValue = `${budget[key].value} ms`;
                gradeCheck();
                formattedResult = `${resultValue} ms`;
                break;
              case 'startRender':
                resultValue = datum.render.data.median.firstView.render;
                budgetValue = `${budget[key].value} ms`;
                gradeCheck();
                formattedResult = `${resultValue} ms`;
                break;
              case 'speedIndex':
                resultValue = datum.render.data.median.firstView.SpeedIndex;
                budgetValue = `${budget[key].value} ms`;
                gradeCheck();
                formattedResult = `${resultValue} ms`;
                break;
              case 'docTime':
                resultValue = datum.render.data.median.firstView.docTime;
                budgetValue = `${budget[key].value} ms`;
                gradeCheck();
                formattedResult = `${resultValue} ms`;
                break;
              case 'load':
                resultValue = datum.render.data.median.firstView.loadTime;
                budgetValue = `${budget[key].value} ms`;
                gradeCheck();
                formattedResult = `${resultValue} ms`;
                break;
              default:
              // do nothing
            }
            table.push([
              budget[key].name,
              budgetValue,
              formattedResult.toLocaleString(),
              grade
            ]);
          });
          return console.log(`
            -------------------------------------------------


              Sift Results for ${options.tests[index].name}:

              ${table.toString()}
          `);
        }
        return console.log(`Test failed, reason: ${datum.error.message}`);
      });

      // If UI
      if (options.ui === true) {
        wpt
          .map(
            {
              mapper: 'siftmap'
            },
            result
          )
          .then(mapped => {
            fs.writeFileSync(path.join(__dirname, 'results.html'), mapped);
            browserSync.init({
              server: {
                baseDir: __dirname
              },
              startPath: './results.html',
              ui: false,
              open: true,
              port: openPort
            });
          })
          .catch(error => {
            console.log(error.stack);
          });
      }

      // If local environment.
      if (ngrok) {
        ngrok.kill();
      }
    });
};

exports.wpt = options => {
  if (options.localPort) {
    const ngrok = require('ngrok'); // eslint-disable-line

    ngrok.connect(options.localPort, (err, url) => {
      if (err) {
        console.log(err);
      }
      Object.values(options.tests).forEach(i => {
        i.url = url + i.url; // eslint-disable-line
      });
      console.log(url);

      wptRun(options, ngrok);
    });
  } else {
    wptRun(options);
  }
};
