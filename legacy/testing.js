
//Get Odds data from VitalBet every 5 minutes and update the match database
var http = require('http');
var querystring = require('querystring');
var every = require('schedule').every;
var request = require('request');
var fs = require('fs');
var stringify = require('stringify');
var dpd = require('deployd');

//This variable is to store existing match Ids to not create same games multiple times
var IDs = [];
var options = {};

//This function initiates the callback and prints the success in case everything went well. It will be called by the POST to db action
function callback(error, response, body) {
  //console.log(response);
  if (!error && response.statusCode == 200) {
    console.log("successfully added new item");
  }
};

//This function takes the IDs variable and compares the new values to it. If they are contained in the array no new match will be created
function indentifyduplicates (existing, newItem) {
    if (existing.indexOf(newItem) === -1) {
        request(options, callback);
        
    } else if (existing.indexOf(newItem) > -1) {
        console.log(newItem + ' already exists in the existing collection.');
    }
};



//This fills the IDs variable with existing IDs so we can check what is existent already
request('http://localhost:2403/match', function(error, response, body) {
  var data = JSON.parse(body);
  for(var i = 0; i < data.length; i++) {
   IDs.push(data[i].matchID)
    };
    console.log(IDs);
  });

request("http://vitalbet.com/api/sportmatch/Get?sportID=1165", function(error, response, body) {
  var data = JSON.parse(body);
  for(var i = 0; i < data.length; i++) {

      options = {
      method: 'POST',
      url: 'http://localhost:2403/match',
      headers: {'Content-Type': 'application/json'},
      form:
        {
        matchID: data[i].ID,
        team1Name: data[i].OriginalHomeTeamName,
        team2Name: data[i].OriginalAwayTeamName,
        odds1: [{"xyz": data[i].DateOfMatchLocalized.DayName}],
        oddsX: [{"odds": data[i].PreviewOdds.Value}]
        }
      };

    indentifyduplicates(IDs, data[i].ID);

    };  
});



