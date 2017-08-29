/* globals require */
'use strict';

var wpt = require('webpagetest-mapper');
var path = require('path');

var exports = module.exports = {};

exports.wpt = function(config) {
  wpt.run({
    uri: config.uri,
    tests: path.join(__dirname, 'config/tests.json'),
    silent: true,
  }).then(function (mapped) {
    fs.writeFileSync(path.join(__dirname, 'results.html'), mapped);
  }).catch(function (error) {
    console.log(error.stack);
  });
}
