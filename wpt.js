/* globals require */
'use strict';

const wpt = require('webpagetest-mapper');
const path = require('path');
const fs = require('fs');
const opn = require('opn');

var exports = module.exports = {};

exports.wpt = (config) => {
  wpt.run({
    key: 'A.bfff1c3ce3cd62a820640fa21b060583',
    tests: path.join(__dirname, 'config/tests.json'),
    silent: true,
    count: 1,
  }).then(function (mapped) {
    fs.writeFileSync(path.join(__dirname, 'results.html'), mapped);
    opn('results.html');
  }).catch(function (error) {
    console.log(error.stack);
  });
}
