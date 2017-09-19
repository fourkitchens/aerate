## Available Stats from Webpagetest.org

```
{
  "firstByte": {
    "name": "First Byte",
    "description": "Time to First Byte is measured as the time from the start of the initial navigation until the first byte of the base page is received by the browser (after following redirects).",
    "value": ""
  },
  "startRender": {
    "name": "Start Render (First Paint)",
    "description": "The Start Render time is the first point in time that something was displayed to the screen.  Before this point in time the user was staring at a blank page.  This does not necessarily mean the user saw the page content, it could just be something as simple as a background color but it is the first indication of something happening for the user.",
    "value": "700"
  },
  "speedIndex": {
    "name": "Speed Index (First Meaningful Paint)",
    "description": "The Speed Index is a calculated metric that represents how quickly the page rendered the user-visible content (lower is better)",
    "value": "1500"
  },
  "docTime": {
    "name": "Document Complete",
    "description": "The metrics grouped together under the Document Complete heading are the metrics collected up until the browser considered the page loaded (onLoad event for those familiar with the javascript events).  This usually happens after all of the images content have loaded but may not include content that is triggered by javascript execution.",
    "value": "4000"
  },
  "load": {
    "name": "Fully Loaded",
    "description": "The metrics grouped together under the Fully Loaded heading are the metrics collected up until there was 2 seconds of no network activity after Document Complete.  This will usually include any activity that is triggered by javascript after the main page loads",
    "value": "5500"
  },
  "bytes": {
    "name": "Bytes In (Page Size)",
    "description": "The amount of data that the browser had to download in order to load the page. It is also commonly referred to as the page size",
    "value": ""
  },
  "requests": {
    "name": "Requests",
    "description": "The total amount of requests",
    "value": ""
  },
  "connections": {
    "name": "Connections",
    "description": "The number of connections used",
    "value": "3"
  }
}
```
