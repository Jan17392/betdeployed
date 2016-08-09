
//Get Odds data from VitalBet every 5 minutes and update the match database
var http = require('http');
var querystring = require('querystring');
var every = require('schedule').every;
var request = require('request');
var stringify = require('stringify');

//This variable is to store existing match Ids to not create same games multiple times
var IDs = [];
var options = {};
var preview = [];

//This function initiates the callback and prints the success in case everything went well. It will be called by the PUT to db action
function callback(error, response, body) {
  //console.log(response);
  if (!error && response.statusCode == 200) {
    console.log("successfully added new odds");
  }
};

request("http://vitalbet.com/api/sportmatch/Get?sportID=1165", function(error, response, body) {
  var data = JSON.parse(body);

  for(var i = 0; i < data.length; i++) {
    for (var c = 0; c < data[i].PreviewOdds.length; c++) {
      if(data[i].PreviewOdds[c].Title = (data[i].OriginalHomeTeamName + " +0")) {
      var previewObject = {"betHome": data[i].PreviewOdds[c].Value, "betAway": 1};
      preview.push(previewObject);
      console.log(data[i].OriginalHomeTeamName);
      

      options = {
      method: 'PUT',
      url: 'http://localhost:2403/match?matchID=' + data[i].ID,
      headers: {'Content-Type': 'application/json'},
      form:
        {
        odds1: [{"xyz": data[i].DateOfMatchLocalized.DayName}],
        oddsX: [previewObject],
        odds2: [{"date": data[i].ID}]
        }
      };

      request(options, callback);
      //console.log(previewObject);
      console.log(preview);
      console.log(callback);
      };
    };
    };  
});



