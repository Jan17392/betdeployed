//var matchReferencerPredictionsRun = function(){

var fuzzy = require('fuzzy');
var request = require('request');
var moment = require('moment');

var IDs = [];
var findId = [];
var searchId = [];
var idToPush = [];
var getIDforPut = [];

function callback(error, response, body) {
 		 if (!error && response.statusCode == 200) {
   		 console.log("successfully updated");
   		} else {
   			console.log("failed " + error);
   		}
   	};

function settingTimeout() {
     console.log('Timeout ongoing')
    };

//request all matches that are in the database and push them into a search array
var query = JSON.stringify({'createdDate': {$gte: moment().subtract(10, 'days')}});

request('http://localhost:2403/matches/?' + query, function(error, response, body) {
  var data = JSON.parse(body);
  var matches = {}
  var matchNames = []
  console.log("Starting...")
  for(var i = 0; i < data.length; i++) {
    var name = data[i].homeTeamName + data[i].awayTeamName
    matchNames.push(name)
    matches[name] = data[i]
  }
  console.log("", matchNames)
  console.log("We have " + matchNames.length + " matches...")
  
  var query = JSON.stringify({'createdDate': {$gte: moment().subtract(1, 'days')}});

  request('http://localhost:2403/expertpredictions?' + query, function(error, response, body) {
    var data = JSON.parse(body);
    for(var i = 0; i < data.length; i++) {
      var odd = data[i]
      var oddID = odd.id
      var name = odd.homeTeam + odd.awayTeam
      var results = fuzzy.filter(name, matchNames)
      if (results[0]) {
        var matchID = matches[results[0].string].id
        console.log("Found one! Match ID: " + matchID + ", Expertpredictions ID: " + oddID)
        request({ url: 'http://localhost:2403/expertpredictions?id=' + oddID, method: 'PUT', json: {matchReference: matchID}}, callback)
      }
      else {
        //console.log("Nothing found.")
      }
    }
    console.log("Done!")
  })
})


//}
//exports.matchReferencerPredictionsRun = matchReferencerPredictionsRun;