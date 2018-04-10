// Copyright © 2015 Springer Nature
//
// This file is part of webpagetest-mapper.
//
// Webpagetest-mapper is free software: you can redistribute it and/or modify it
// under the terms of the GNU General Public License as published by the Free
// Software Foundation, either version 3 of the License, or (at your option) any
// later version.
//
// Webpagetest-mapper is distributed in the hope that it will be useful, but
// WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or
// FITNESS FOR A PARTICULAR PURPOSE. See the GNU General Public License for more
// details.
//
// You should have received a copy of the GNU General Public License along with
// webpagetest-mapper. If not, see <http://www.gnu.org/licenses/>.

/* globals require, module, console */

const fs = require('fs');
const handlebars = require('handlebars');
const check = require('check-types');

handlebars.registerHelper('formatInteger', number => {
  if (!number) {
    return number;
  }

  return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
});

handlebars.registerHelper('add', (lhs, rhs) => lhs + rhs);

handlebars.registerHelper('minus', (lhs, rhs) => lhs - rhs);

handlebars.registerHelper('halve', number => number / 2);

handlebars.registerHelper('percent', number => {
  if (number === -1) {
    return 'n/a';
  }

  return `${number}%`;
});

handlebars.registerHelper('lowercase', string => {
  if (!string) {
    return string;
  }

  return string.toLowerCase();
});

handlebars.registerHelper('uppercase', string => {
  if (!string) {
    return string;
  }

  return string.toUpperCase();
});

handlebars.registerHelper('debug', value => {
  console.log(
    '######################################################################'
  );
  console.log(
    '#####               ##################################################'
  );
  console.log(
    '#####   D E B U G   ##################################################'
  );
  console.log(
    '#####               ##################################################'
  );
  console.log(
    '######################################################################'
  );
  console.log('template context:');
  console.log(this);
  if (arguments.length === 2) {
    console.log('template value:');
    console.log(value);
  }
});

handlebars.registerHelper('json', context => JSON.stringify(context));

function compile(templatePath) {
  check.assert.unemptyString(templatePath, 'invalid template path');

  return handlebars.compile(
    fs.readFileSync(templatePath, { encoding: 'utf8' })
  );
}

module.exports = { compile };
