[![Four Kitchens](https://img.shields.io/badge/4K-Four%20Kitchens-35AA4E.svg)](https://fourkitchens.com/)

# Sift
Measure frontend performance against a budget using lovely charts in a browser

## Usage

### Standalone
1. Clone this repo.
2. `npm install` or `yarn install` (ignore warnings)
3. Edit `config.json` and add your [API key](https://www.webpagetest.org/getkey.php) and test information to "key" and "test"
4. `npm run sift` or `yarn run sift` (may take a minute or two)

### In Your Project
1. `npm install fourkitchens/sift --save`
2. Add a script to your local package.json file like

```
  "scripts": {
    "sift": "sift"
  }
```
3. Create a local-config.json file (see [config.json](https://github.com/fourkitchens/sift/blob/master/config.json) as an example)

## TODO

1. Multiple tests (pages)
2. Responsive charts
3. Fix webpagetest-mapper install warnings (node-gyp related?)
3. Instructions for adding other tests and values
4. Email when test fails?
5. Cleanup mapper files
6. Loading screen?
