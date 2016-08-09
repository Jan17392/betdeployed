
//Get Odds data from VitalBet every 5 minutes and update the matches database
var http = require('http');
var querystring = require('querystring');
var every = require('schedule').every;
var request = require('request');
var fs = require('fs');
var stringify = require('stringify');
var dpd = require('deployd');

request("http://vitalbet.com/api/sportmatch/Get?sportID=1165", function(error, response, body) {
  var data = JSON.parse(body);
  for(var i = 0; i < data.length; i++) {

  	    var options = {
    	method: 'POST',
    	url: 'http://localhost:2403/matches',
    	headers: {'Content-Type': 'application/json'},
    	form:
    		{
    		Team1: data[i].OriginalHomeTeamName,
    		Team2: data[i].OriginalAwayTeamName,
    		Odds1: data[i].DateOfMatchLocalized.DayName
    		}
    }
 
function callback(error, response, body) {
	//console.log(response);
  if (!error && response.statusCode == 200) {
    console.log("success")
  }
}
 
request(options, callback);
  }

/*
    var options = {
    	method: 'POST',
    	url: 'http://localhost:2403/matches',
    	headers: {'Content-Type': 'application/json'},
    	form:
    		{
    		Team2: match.Team2,
    		Team1: match.Team1
    		}
    };
 
function callback(error, response, body) {
	//console.log(response);
  if (!error && response.statusCode == 200) {
    
  }
}
 
request(options, callback);
*/
});

