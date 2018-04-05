[![Four Kitchens](https://img.shields.io/badge/4K-Four%20Kitchens-35AA4E.svg)](https://fourkitchens.com/)

![Aerate Logo](https://user-images.githubusercontent.com/18293479/38391908-572356b2-38eb-11e8-9fd5-62daf5d2bad3.png)

## Measure frontend performance against a budget with an optional UI

<img src="https://user-images.githubusercontent.com/18293479/38394725-3f7eb0d8-38f5-11e8-80fb-a3a396b55fa7.jpg" width="441" alt="Aerate Results" /> <img src="https://user-images.githubusercontent.com/18293479/38394726-3f905ca2-38f5-11e8-9a12-4d1152b083ca.jpg" width="441" alt="Aerate UI" />

## Usage

1.  Get a [WebPageTest.org API key](https://www.webpagetest.org/getkey.php)
2.  `npm install fourkitchens/aerate` or `yarn add fourkitchens/aerate`
3.  Require Aerate in your project

```
const aerate = require('aerate');
```

4.  Call the function with the options (options [below](https://github.com/fourkitchens/aerate#available-options))

```
aerate({
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

5.  For a shorter command, add a script to your package.json

```
"scripts": {
  "aerate": "node aerate.js" (or whatever file you're using locally)
}
```

6.  `npm run aerate` or `yarn aerate`
7.  (Optional) Create/copy your own budget.json file using the following format:

```
{
  "TTFB": { // WPT Statistic name
    "name": "First Byte", // Readable Name presented on UI
    "description": "Time to First Byte is measured as the time from the start of the initial navigation until the first byte of the base page is received by the browser (after following redirects).",
    "value": "300" // Budgeted Value
  }
}
```

See [`/docs/stats.md`](https://github.com/fourkitchens/aerate/blob/master/docs/stats.md) for the list of available budget statistics

### Available Options:

1.  `key`: REQUIRED API Key
2.  `tests`: REQUIRED tests to run
3.  `connection`: OPTIONAL defaults to 'Mobile LTE'
4.  `count`: OPTIONAL how many tests to run (WebPageTest.org supports up to 9)
5.  `ui`: OPTIONAL open Aerate UI in browser vs. console (defaults to false)
6.  `localPort`: OPTIONAL for local testing, enter your environment port

## How do I set up the dev environment?

1.  [x] clone repo, cd into it and run `yarn` to install dependencies
1.  [ ] Run `gulp` (opens up the UI with fake data populated from `mapper/fake-results.json`)

PostCSS usage:
If you would like any new [PostCSS plugins](https://github.com/postcss/postcss/blob/master/docs/plugins.md) installed, the steps are as follows:

1.  `npm install --save-dev PLUGIN_NAME`
1.  Add your plugin to gulpfile.js at the top [like the others](https://github.com/fourkitchens/aerate/blob/0be17524b601d649c038bd113ca756ada4bb19ca/gulpfile.js#L10) and reference that addition in the [postCSS call
    ](https://github.com/fourkitchens/aerate/blob/0be17524b601d649c038bd113ca756ada4bb19ca/gulpfile.js#L27)

## TODO

1.  Responsive charts
1.  Fix webpagetest-mapper install warnings (node-gyp related?)
1.  Email results on a regular basis (separate tool likely)
1.  Cleanup mapper files
1.  Loading screen?
1.  Tracking/charting results for a set time period
