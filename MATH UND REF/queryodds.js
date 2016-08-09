var request = require('request');
var stringify = require('stringify');

var data = "";

function callback(error, response, body) {
 		 if (!error && response.statusCode == 200) {
   		 console.log("data received");
   		 console.log(body);
   		 console.log(body.length);
   		} else {
   			console.log("failed " + error);
   		}
   	};

var query = JSON.stringify({'matchReference': {$exists:true}});
console.log(query);

request({ url: 'http://localhost:2403/odds?' + query, method: 'GET'}, callback);



