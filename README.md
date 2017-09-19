[![Four Kitchens](https://img.shields.io/badge/4K-Four%20Kitchens-35AA4E.svg)](https://fourkitchens.com/)

# Sift
Measure frontend performance against a budget using lovely charts in a browser

## Usage

1. Get a [WebPageTest.org API key](https://www.webpagetest.org/getkey.php)
2. Require Sift
```
const sift = require('sift');
```
3. Call the function with the options (options [below](https://github.com/fourkitchens/sift#available-options))
```
sift({
  key: 'YOUR_API_KEY',
  tests: [
    {
      name: 'Four Kitchens',
      url: 'http://fourkitchens.com/',
      type: 'homepage'
    }
  ]
});
```

4. (Optional) Create/copy your own [budget.json](https://github.com/fourkitchens/sift/blob/master/budget.json) file using the following format:

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
5. `ui`: OPTIONAL open Sift UI in browser defaults to true


## TODO

1. Multiple tests (pages)
2. Responsive charts
3. Fix webpagetest-mapper install warnings (node-gyp related?)
4. Email when test fails?
5. Cleanup mapper files
6. Loading screen?
