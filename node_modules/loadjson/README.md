# loadjson

load json safety && mock api

## Installation

`npm install --save loadjson`

## Usage

load common json

``` javascript
var loadjson = require('loadjson')
var config = loadjson('package.json')

if (!config.error){
  console.log(config);
  console.log(config.name);
}
```

api sucess

```
var loadjson = require('loadjson');
var config = loadjson('package.json', 0);

if (!config.error){
  console.log(config.data.name);
}
```

api error

```
var loadjson = require('loadjson');
var config = loadjson('package.json', 1);

if (!config.error){
  console.log(config.data.name);
}
```

or api error with custom msg

```
var loadjson = require('loadjson');
var config = loadjson('package.json', 1, 'some reason');

if (!config.error){
  console.log(config.status.msg == 'some reason');
}
```

## License

MIT (http://www.opensource.org/licenses/mit-license.php)