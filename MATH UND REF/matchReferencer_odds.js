var fuzzy = require('fuzzy');
var request = require('request');

var IDs = [];
var findId = [];
var searchId = [];
var idToPush = [];
var getIDforPut = [];

function callback(error, response, body) {
 		 if (!error && response.statusCode == 200) {
   		 console.log("successfully created");
   		} else {
   			console.log("failed " + error);
   		}
   	};

function settingTimeout() {
     console.log('Timeout ongoing')
    };

//request all matches that are in the database and push them into a search array
request('http://localhost:2403/matches/', function(error, response, body) {
  var data = JSON.parse(body);
  for(var i = 0; i < data.length; i++) {
   searchId.push(data[i].homeTeamName + data[i].awayTeamName)
   idToPush.push(data[i].id)
    };
    console.log(searchId);
    console.log(idToPush)

//request all expertpredictions in the database and push them into a find array
var query = JSON.stringify({'matchReference': {$exists:false}});
console.log(query);

request('http://localhost:2403/odds?' + query, function(error, response, body) {
  var data = JSON.parse(body);
  for(var i = 0; i < data.length; i++) {
   IDs.push({teamNames: data[i].homeTeam + data[i].awayTeam, id: data[i].id})
   findId.push(data[i].homeTeam + data[i].awayTeam)
   getIDforPut.push(data[i].id)
    };
    console.log(IDs);
    console.log(findId);

//lookup all matches for matching phrases in the expertpredictions collection. If any found, print the results
for(var i = 0; i < searchId.length; i++) {

var options = {extract: function(el) { return el.teamNames; }
};

var results = fuzzy.filter(searchId[i], IDs, options);
var matches = results.map(function(el) { return el.string; });
console.log(searchId[i]);
console.log(idToPush[i]);
console.log(matches);

for(var x = 0; x < matches.length; x++) {
	if(matches != []) {

		var indices = [];
		var indicesFinal = [];
		var idx = findId.indexOf(matches[x]);
		console.log(getIDforPut[idx]);
		request({ url: 'http://localhost:2403/odds?id=' + getIDforPut[idx], method: 'PUT', json: {matchReference: idToPush[i]}}, callback);

		//console.log(indicesFinal);
			while (idx != -1) {
  				//indices.push(idx);
  				idx = findId.indexOf(matches[x], idx + 1)
  				console.log(getIDforPut[idx]);
          setTimeout(settingTimeout, 10000);
  				request({ url: 'http://localhost:2403/odds?id=' + getIDforPut[idx], method: 'PUT', json: {matchReference: idToPush[i]}}, callback)

  				}
	}
};

//find expertpredictions id where to put the matchId
//request({ url: 'http://localhost:2403/expertpredictions?id=5250d23efe531bdb', method: 'PUT', json: {matchReference: idToPush[i].id}}, callback)

}
});
});


