# isEmpty

Tells you if the value is empty. Empty values are '', undefined, null, [], {}, and objects with no enumerable properties.

## Installation

```
npm install atropa-is-empty
```

## Usage

In node:

```
var isEmpty = require('atropa-is-empty');
console.log(isEmpty('')); // logs true
console.log(isEmpty('x')); // logs false
```

In the browser, include `./browser/is-empty_web.js` in your page. `isEmpty` will
 be available in your page. see the example in `./browser/index.html`
