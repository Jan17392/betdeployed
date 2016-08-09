var arrayTrim = require('../src/array-trim.js');
var fs = require('fs');
var path = require('path');
var specPath = path.resolve(__dirname, '../browser/tests/array-trim.test.js');
var specCode = fs.readFileSync(specPath, 'utf8');
eval(specCode);
