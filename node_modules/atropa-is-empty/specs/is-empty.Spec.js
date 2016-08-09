var isEmpty = require('../src/is-empty.js');
var fs = require('fs');
var path = require('path');
var specPath = path.resolve(__dirname, '../browser/tests/is-empty.test.js');
var specCode = fs.readFileSync(specPath, "utf8");
eval(specCode);
