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

/* globals require, __dirname, module */

const fs = require('fs');
const path = require('path');
const check = require('check-types');
const render = require('../../src/templates').compile(path.join(__dirname, 'template.html'));
const packageInfo = require('../../package.json');

// Check for local budget file
let budget = require('../../budget');

if (fs.existsSync(`${process.env.PWD}/budget.json`)) {
  budget = require(`${process.env.PWD}/budget.json`); // eslint-disable-line
}

const charts = [];

const chartWidth = 832;
const chartMargin = 140;
const chartPadding = 29;
const barHeight = 32;
const barPadding = 2;
const labelOffset = 16;

function getTime(results, key) {
  return results.times[key];
}

function getViewResult(view, result) {
  return result[view + 'View']; // eslint-disable-line
}

function expressValueInRtt(datum) {
  if (!datum.rtt) {
    return -1;
  }

  return Math.ceil(datum.value / datum.rtt);
}


function getSimpleValue(view, chartKey, metric, result) {
  const datum = getViewResult(view, result)[chartKey];

  if (metric === 'rtt') {
    return expressValueInRtt(datum);
  }

  return datum.value;
}


function getDerivativeOperands(view, chartKey, metric, result) {
  let lhs;
  let rhs;

  if (Array.isArray(view)) {
    lhs = getViewResult(view[0], result);
    rhs = getViewResult(view[1], result);
  } else {
    rhs = getViewResult(view, result);
    lhs = rhs;
  }

  if (Array.isArray(chartKey)) {
    lhs = lhs[chartKey[0]];
    rhs = rhs[chartKey[1]];
  } else {
    lhs = lhs[chartKey];
    rhs = rhs[chartKey];
  }

  if (metric === 'rtt') {
    return {
      lhs: expressValueInRtt(lhs),
      rhs: expressValueInRtt(rhs),
    };
  }

  return { lhs: lhs.value, rhs: rhs.value };
}

function getDerivativeValue(view, chartKey, derivative, metric, result) {
  const operands = getDerivativeOperands(view, chartKey, metric, result);

  if (derivative === 'difference') {
    return operands.lhs - operands.rhs;
  }

  if (derivative === 'percentage') {
    return Math.round((operands.lhs / operands.rhs) * 100);
  }

  throw new Error(`unrecognised derivative '${derivative}'`);
}

function getValue(view, chartKey, derivative, metric, result) {
  if (derivative) {
    return getDerivativeValue(view, chartKey, derivative, metric, result);
  }

  return getSimpleValue(view, chartKey, metric, result);
}

function filterResults(view, chartKey, derivative, metric, result) {
  return getValue(view, chartKey, derivative, metric, result) >= 0;
}

function mapChartResult(view, chartKey, derivative, metric, unitsPerPixel, result, index) {
  if (result.error) {
    return result;
  }

  const value = getValue(view, chartKey, derivative, metric, result);
  let barWidth = value / unitsPerPixel;

  if (barWidth % 1 !== 0) {
    barWidth = barWidth.toFixed(2);
  }

  let textAnchor;
  let textOrientation = '';
  let textClass = 'chart-label';

  if (barWidth < 40) {
    textAnchor = 'start';
  } else {
    textOrientation = '-';
    textClass += ' chart-bar-label';
    textAnchor = 'end';
  }

  return {
    offset: index * (barHeight + barPadding),
    name: result.name,
    type: result.type,
    barWidth,
    value: value + (derivative === 'percentage' ? '%' : ''),
    textOrientation,
    textClass,
    textAnchor,
  };
}

function compareResults(view, chartKey, derivative, metric, first, second) {
  if (first.error) {
    return 1;
  }

  if (second.error) {
    return -1;
  }

  return getValue(view, chartKey, derivative, metric, first) -
      getValue(view, chartKey, derivative, metric, second);
}

function getMaximumValue(view, chartKey, derivative, metric, results) {
  return results.reduce((maximum, result) => {
    if (result.error) {
      return maximum;
    }

    const current = getValue(view, chartKey, derivative, metric, result);

    if (current > maximum) {
      return current;
    }

    return maximum;
  }, 0);
}


function mapChart(results, chart) {
  const fResults = filterResults.bind(null, chart.view, chart.key, chart.derivative, chart.metric);
  const filteredResults = results.filter(fResults);
  const cResults = compareResults.bind(null, chart.view, chart.key, chart.derivative, chart.metric);
  const maxValue = getMaximumValue(chart.view, chart.key, chart.derivative, chart.metric, results);
  const chartDiff = maxValue / (chartWidth - chartMargin);
  const mappedResult = mapChartResult.bind(null, chart.view, chart.key, chart.derivative, chart.metric, chartDiff); // eslint-disable-line

  return {
    title: chart.title,
    sectionTitle: chart.sectionTitle,
    height: (filteredResults.length * (barHeight + barPadding)) + chartPadding,
    yAxisHeight: (filteredResults.length * (barHeight + barPadding)) + barPadding,
    tests: filteredResults.sort(cResults).map(mappedResult),
    label: chart.label,
    xAxis: {
      offset: (filteredResults.length * (barHeight + barPadding)) + 1,
      width: (chartWidth - chartMargin) + 2,
      labelPosition: Math.round(((chartWidth - chartMargin) + 2) / 2),
    },
  };
}

function clone(thing) {
  let cloned;

  if (check.array(thing)) {
    cloned = [];
  } else {
    cloned = {};
  }

  Object.keys(thing).forEach((key) => {
    const property = thing[key];

    if (check.either.object(property).or.array(property)) {
      cloned[key] = clone(property);
    } else {
      cloned[key] = property;
    }
  });

  return cloned;
}

function getViewKey(view) {
  return view + 'View'; // eslint-disable-line
}

function getData(result, metric) {
  return result[metric].data;
}

function getMedianRun(result, metric, view) {
  return getData(result, metric).median[getViewKey(view)];
}

function getUrls(result, medianMetric, view) {
  const median = getMedianRun(result, medianMetric, view);
  let run;

  if (Array.isArray(median.run)) {
    run = median.run[0]; // eslint-disable-line
  } else {
    run = median.run; // eslint-disable-line
  }

  return getData(result, medianMetric).runs[run][getViewKey(view)].pages;
}

function getOptimisationsUrl(result, medianMetric, view) {
  return getUrls(result, medianMetric, view).checklist;
}

function getWaterfallUrl(result, medianMetric, view) {
  return getUrls(result, medianMetric, view).details;
}


function mapResult(log, result) {
  let message;

  try {
    message = `result ${result.id} [${result.name}]`;
    log.info(`mapping ${message}`);

    if (result.error) {
      return result;
    }

    return {
      name: result.name,
      type: result.type,
      url: result.url,
      optimisationsUrl: getOptimisationsUrl(result, 'SpeedIndex', 'first'),
      firstView: {
        firstByte: {
          url: getWaterfallUrl(result, 'TTFB', 'first'),
          value: getMedianRun(result, 'TTFB', 'first').TTFB,
          rtt: getMedianRun(result, 'TTFB', 'first').server_rtt,
        },
        startRender: {
          url: getWaterfallUrl(result, 'render', 'first'),
          value: getMedianRun(result, 'render', 'first').render,
          rtt: getMedianRun(result, 'render', 'first').server_rtt,
        },
        speedIndex: {
          url: getWaterfallUrl(result, 'SpeedIndex', 'first'),
          value: getMedianRun(result, 'SpeedIndex', 'first').SpeedIndex,
          rtt: getMedianRun(result, 'SpeedIndex', 'first').server_rtt,
        },
        docTime: {
          value: getMedianRun(result, 'SpeedIndex', 'first').docTime,
        },
        load: {
          url: getWaterfallUrl(result, 'loadTime', 'first'),
          value: getMedianRun(result, 'loadTime', 'first').loadTime,
          rtt: getMedianRun(result, 'loadTime', 'first').server_rtt,
        },
        bytes: {
          url: getWaterfallUrl(result, 'SpeedIndex', 'first'),
          value: getMedianRun(result, 'SpeedIndex', 'first').bytesIn,
        },
        requests: {
          url: getWaterfallUrl(result, 'SpeedIndex', 'first'),
          value: getMedianRun(result, 'SpeedIndex', 'first').requests,
        },
        connections: {
          url: getWaterfallUrl(result, 'SpeedIndex', 'first'),
          value: getMedianRun(result, 'SpeedIndex', 'first').connections,
        },
      },
    };
  } catch (error) {
    log.error(`failed to map ${message}; ${error.message}`);
    return result;
  }
}

function mapResults(options, results) {
  const date = getTime(results, 'end');
  const formattedDate = date.toLocaleDateString();

  let locationParts = options.location.split(':');
  if (locationParts.length === 1) {
    locationParts = options.location.split('_');
  }

  const mapped = results.data.map(mapResult.bind(null, options.log));

  // Britecharts Needs
  const newBarChart = [];
  const newSingleData = [];
  mapped.forEach((datum, index) => {
    Object.keys(budget).forEach((key) => {
      const barChartData = [];
      if (mapped[index].firstView[key] !== undefined) {
        const actualItem = {};
        // Measurement
        // Measurement Value
        actualItem.percentage = mapped[index].firstView[key].value;
        // Measurement Name
        actualItem.name = 'Results';
        actualItem.id = 1;
        barChartData.push(actualItem);
        mapped[index].firstView[key].testName = budget[key].name;
        mapped[index].firstView[key].testDescription = budget[key].description;
        // Budget
        const budgetItem = {};
        budgetItem.percentage = parseInt(budget[key].value, 10);
        budgetItem.name = 'Budget';
        budgetItem.id = 0;
        if (actualItem.percentage > budgetItem.percentage) {
          budgetItem.class = 'over-budget';
        } else {
          budgetItem.class = '';
        }
        if (key === 'bytes' || key === 'requests' || key === 'connections') {
          budgetItem.class = 'single-data';
        }
        barChartData.push(budgetItem);
      }
      newBarChart.push(barChartData);
    });
    mapped.push(newBarChart);
  });

  return {
    application: packageInfo.name,
    version: packageInfo.version,
    date: formattedDate,
    count: options.count,
    location: locationParts[0],
    connection: options.connection,
    times: {
      begin: getTime(results, 'begin').toLocaleTimeString(),
      end: `${date.toLocaleTimeString()} on ${formattedDate}`,
    },
    charts: charts.map(mapChart.bind(null, clone(mapped))),
    chartWidth,
    chartMargin,
    barHeight,
    labelOffset,
    // Sift specific
    results: mapped,
    budget,
    newSingleData,
  };
}

function map(options, results) {
  check.assert.object(options, 'invalid options');
  check.assert.unemptyString(options.location, 'invalid location option');
  check.assert.object(results, 'invalid results');
  check.assert.array(results.data, 'invalid result data');
  check.assert.object(results.times, 'invalid result times');
  check.assert.date(results.times.begin, 'invalid begin time');
  check.assert.date(results.times.end, 'invalid end time');

  return render(mapResults(options, results));
}

module.exports = { map };
