var loadjson = require('./index')

var config = loadjson('package.json');

if (!config.error){
  console.log('---------------------\n')
  console.log(config.version);
}
var config = loadjson('package.json', 0);
if (!config.error){
  console.log('---------------------\n')
  console.log(config.status.code == 0);
}


var config = loadjson('package.json', 1)

if (!config.error){
  // console.log(config)
  console.log('---------------------\n')
  console.log(config.status.code == 1);
}

var config = loadjson('package.json', 1, 'bug')

if (!config.error){
  // console.log(config)
  console.log('---------------------\n')
  console.log(config.status.code == 1);
  console.log(config.status.msg == 'bug');
}