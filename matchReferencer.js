var fuzzy = require('fuzzy');
var request = require('request');

var IDs = [];
var findId = [];
var searchId = [];
var idToPush = [];

function callback(error, response, body) {
 		 if (!error && response.statusCode == 200) {
   		 console.log("successfully created");
   		} else {
   			console.log("failed " + error);
   		}
   	};

//request all matches that are in the database and push them into a search array
request('http://localhost:2403/matches', function(error, response, body) {
  var data = JSON.parse(body);
  for(var i = 0; i < data.length; i++) {
   searchId.push(data[i].homeTeamName + data[i].awayTeamName)
   idToPush.push(data[i].id)
    };
    console.log(searchId);
    console.log(idToPush)

//request all expertpredictions in the database and push them into a find array
request('http://localhost:2403/expertpredictions', function(error, response, body) {
  var data = JSON.parse(body);
  for(var i = 0; i < data.length; i++) {
   IDs.push(data[i].homeTeam + data[i].awayTeam)
   findId.push({teamNames: data[i].homeTeam + data[i].awayTeam, id: data[i].id})
    };
    console.log(IDs);
    console.log(findId);

//lookup all matches for matching phrases in the expertpredictions collection. If any found, print the results
for(var i = 0; i < searchId.length; i++) {

var results = fuzzy.filter(searchId[i], IDs);
var matches = results.map(function(el) { return el.string; });
console.log(searchId[i]);
console.log(idToPush[i]);

/*
for(var x = 0; x < matches.length; x++) {
	findId.teamNames.find(matches[x]);
	console.log(findId.teamNames.find(matches[x]));
}
*/
//find expertpredictions id where to put the matchId
//request({ url: 'http://localhost:2403/expertpredictions?id=5250d23efe531bdb', method: 'PUT', json: {matchReference: idToPush[i].id}}, callback)

}
});
});