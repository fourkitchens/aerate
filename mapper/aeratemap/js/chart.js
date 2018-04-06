((document, window, d3, britecharts, tooltip) => {
  function createHorizontalBarChart(budgetData, briteElementChart, colors) {
    // eslint-disable-line
    const tooltip = new britecharts.miniTooltip(); // eslint-disable-line
    let barChart = new britecharts.bar(); // eslint-disable-line
    const margin = {
      left: 80,
      right: 20,
      top: 20,
      bottom: 30
    };
    const barContainer = d3.select(briteElementChart[0]);
    const getWidth = barContainer.node().getBoundingClientRect().width;
    const containerWidth = barContainer.node() ? getWidth : false;

    if (containerWidth) {
      barChart
        .isHorizontal(true)
        .margin(margin)
        .width(containerWidth)
        .colorSchema(colors)
        .valueLabel('percentage')
        .isAnimated(true)
        .percentageAxisToMaxRatio(1.2)
        .height(200)
        .on('customMouseOver', tooltip.show)
        .on('customMouseMove', tooltip.update)
        .on('customMouseOut', tooltip.hide);

      barContainer.datum(budgetData).call(barChart);
    }

    // Responsive
    // const redrawChart = () => {
    //   const allCharts = document.querySelectorAll('.chart__barchart');
    //   const container = d3.select(allCharts[i]);
    //   const getContainerWidth = container.node().getBoundingClientRect().width;
    //   const newContainerWidth = container.node() ? getContainerWidth : false;
    //
    //   // Setting the new width on the chart
    //   barChart.width(newContainerWidth);
    //
    //   // Rendering the chart again
    //   container.datum(budgetData).call(barChart);
    // };

    // window.addEventListener('resize', redrawChart);
  }

  let i = 0;
  let len = 0;
  let colors = ['#ffce00', '#6aedc7'];
  const newBarChart = [];
  const budgetData = newBarChart[i];
  const briteElement = document.querySelectorAll('.chart');
  const briteElementChart = briteElement[i].querySelectorAll(
    '.chart__barchart'
  );

  function createBarChart() {
    const tooltipItem = briteElement[i].querySelectorAll('.metadata-group');
    const tooltipContainer = d3.select(tooltipItem[0]);
    tooltipContainer.datum([]).call(tooltip);

    // Data (budget)
    const budgetSpan = briteElement[i].querySelectorAll('.chart__budget');
    if (budgetData[1].percentage !== null) {
      budgetSpan[0].textContent = ` ${budgetData[1].percentage}ms`;
    } else {
      budgetSpan[0].textContent = ' NA';
    }

    // Data (results)
    const resultsSpan = briteElement[i].querySelectorAll('.chart__results');
    resultsSpan[0].textContent = ` ${budgetData[0].percentage}ms`;

    // Britecharts
    if (budgetData[1].class.length > 0) {
      briteElement[i].classList.add(budgetData[1].class);

      if (budgetData[1].class === 'single-data') {
        resultsSpan[0].textContent = ` ${budgetData[0].percentage}`;
      }

      if (budgetData[1].class === 'over-budget') {
        colors = ['#ffce00', '#f55573'];

        const statusSpan = briteElement[i].querySelectorAll('.chart__passed');
        statusSpan[0].textContent = ' Failed';
      }
    }
  }

  for (i = 0, len = newBarChart.length; i < len; i += 1) {
    createBarChart(colors);
    createHorizontalBarChart(budgetData, briteElementChart, colors);
  }
})();
