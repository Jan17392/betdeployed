# array-trim

JavaScript module for trimming empty values from an array. Empty values are '', undefined, null, [], {}, and objects with no enumerable properties.

## Installation

```
npm install array-trim
```

## Usage

In node:

```
var arrayTrim = require('array-trim');
console.log(array-trim(['s', '', 'd'])); // logs ['s','d']
```

In the browser, include `./browser/array-trim_web.js` in your page. `arrayTrim` will
 be available in your page.
