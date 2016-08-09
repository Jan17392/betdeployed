//Delete the match database for cleanup and testing
var http = require('http');
var querystring = require('querystring');
var every = require('schedule').every;
var request = require('request');
var stringify = require('stringify');


//This variable is to store existing match Ids to not create same games multiple times
var IDs = [];
var options = {};

//This fills the IDs variable with existing IDs so we can check what is existent already
request('http://localhost:2403/odds/', function(error, response, body) {
  var data = JSON.parse(body);
  for(var i = 0; i < data.length; i++) {
   IDs.push(data[i].id)
    };
    console.log(IDs);

    for(var i = 0; i < data.length; i++) {

      options = {
      method: 'DELETE',
      url: 'http://localhost:2403/odds?id=' + data[i].id,
      };

      request(options, callback);
      //This function initiates the callback and prints the success in case everything went well. It will be called by the POST to db action
		function callback(error, response, body) {
 	 //console.log(response);
 		 if (!error && response.statusCode == 200) {
   		 console.log("successfully deleted");
   		}
   	};
};

});




