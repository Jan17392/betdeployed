var loadjson = require('loadjson')
var config = loadjson('package.json')

loadJSON('http://www.enetscores.com/static/default/livescore/master.1.json', gotData);

function gotData(data) {
	console.log(data);
};