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

/*globals require, module, console */

'use strict';

var fs, handlebars, check;

fs = require('fs');
handlebars = require('handlebars');
check = require('check-types');

handlebars.registerHelper('formatInteger', function (number) {
    if (!number) {
        return number;
    }

    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
});
handlebars.registerHelper('add', function (lhs, rhs) {
    return lhs + rhs;
});
handlebars.registerHelper('minus', function (lhs, rhs) {
    return lhs - rhs;
});
handlebars.registerHelper('halve', function (number) {
    return number / 2;
});
handlebars.registerHelper('percent', function (number) {
    if (number === -1) {
        return 'n/a';
    }

    return number + '%';
});
handlebars.registerHelper('lowercase', function (string) {
    if (!string) {
        return string;
    }

    return string.toLowerCase();
});
handlebars.registerHelper('debug', function (value) {
    console.log('######################################################################');
    console.log('#####               ##################################################');
    console.log('#####   D E B U G   ##################################################');
    console.log('#####               ##################################################');
    console.log('######################################################################');
    console.log('template context:');
    console.log(this);
    if (arguments.length === 2) {
        console.log('template value:');
        console.log(value);
    }
});

handlebars.registerHelper('json', function(context) {
    return JSON.stringify(context);
});

module.exports = {
    compile: compile
};

function compile (templatePath) {
    check.assert.unemptyString(templatePath, 'invalid template path');

    return handlebars.compile(fs.readFileSync(templatePath, { encoding: 'utf8' }));
}

// Britecharts
// const d3Selection = require('d3-selection');
// const PubSub = require('pubsub-js');
//
// const bar = require('./../src/charts/bar');
// const miniTooltip = require('./../src/charts/mini-tooltip');
// const colors = require('./../src/charts/helpers/colors');
// const dataBuilder = require('./../test/fixtures/barChartDataBuilder');
//
//     require('./helpers/resizeHelper');
//
// config = require('../../config/config.json');
//
// function createHorizontalBarChart() {
//     let barChart = bar(),
//         tooltip = miniTooltip(),
//         barContainer = d3Selection.select('.js-horizontal-bar-chart-container'),
//         containerWidth = barContainer.node() ? barContainer.node().getBoundingClientRect().width : false,
//         tooltipContainer,
//         dataset;
//
//     if (containerWidth) {
//         dataset = testDataSet.withColors().build();
//
//         barChart
//             .isHorizontal(true)
//             .isAnimated(true)
//             .margin({
//                 left: 120,
//                 right: 20,
//                 top: 20,
//                 bottom: 30
//             })
//             .colorSchema(colors.colorSchemas.britecharts)
//             .width(containerWidth)
//             .yAxisPaddingBetweenChart(30)
//             .height(300)
//             .percentageAxisToMaxRatio(1.3)
//             .on('customMouseOver', tooltip.show)
//             .on('customMouseMove', tooltip.update)
//             .on('customMouseOut', tooltip.hide);
//
//         barContainer.datum(dataset).call(barChart);
//
//         tooltipContainer = d3Selection.select('.js-horizontal-bar-chart-container .bar-chart .metadata-group');
//         tooltipContainer.datum([]).call(tooltip);
//     }
// }
