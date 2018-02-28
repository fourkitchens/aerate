[![Four Kitchens](https://img.shields.io/badge/4K-Four%20Kitchens-35AA4E.svg)](https://fourkitchens.com/)

# Sift
Measure frontend performance against a budget with an option to view them using lovely charts in a browser

## Usage

1. Get a [WebPageTest.org API key](https://www.webpagetest.org/getkey.php)
2. `npm install fourkitchens/sift` or `yarn add fourkitchens/sift`
3. Require Sift in your project
```
const sift = require('sift');
```
4. Call the function with the options (options [below](https://github.com/fourkitchens/sift#available-options))
```
sift({
  key: 'YOUR_API_KEY',
  tests: [
    {
      name: 'Four Kitchens',
      url: 'http://fourkitchens.com/', // Or use relative urls for local tests
      type: 'homepage'
    }
  ]
});
```
5. For a shorter command, add a script to your package.json
```
"scripts": {
  "sift": "node sift.js" (or whatever file you're using locally)
}
```
6. `npm run sift` or `yarn sift`
7. (Optional) Create/copy your own budget.json file using the following format:

```
{
  "TTFB": { // WPT Statistic name
    "name": "First Byte", // Readable Name presented on UI
    "description": "Time to First Byte is measured as the time from the start of the initial navigation until the first byte of the base page is received by the browser (after following redirects).",
    "value": "300" // Budgeted Value
  }
}

```
See [`/docs/stats.md`](https://github.com/fourkitchens/sift/blob/master/docs/stats.md) for the list of available budget statistics


### Available Options:
1. `key`: REQUIRED API Key
2. `tests`: REQUIRED tests to run
3. `connection`: OPTIONAL defaults to 'Mobile LTE'
4. `count`: OPTIONAL how many tests to run (WebPageTest.org supports up to 9)
5. `ui`: OPTIONAL open Sift UI in browser vs. console (defaults to false)
6. `localPort`: OPTIONAL for local testing, enter your environment port


## TODO

1. Multiple tests in UI
1. Add server response time
1. Possibly subtract server response time in data to return better results?
1. Responsive charts
1. Fix webpagetest-mapper install warnings (node-gyp related?)
1. Email results on a regular basis (separate tool likely)
1. Cleanup mapper files
1. Loading screen?
1. Tracking/charting results for a set time period
