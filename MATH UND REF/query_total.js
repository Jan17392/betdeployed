var request = require('request');
var stringify = require('stringify');
var math = require('mathjs');

var predictions = [];
var odds = [];
var matches = [];

function callback_matches(error, response, body) {
 		if (!error && response.statusCode == 200) {
   		console.log("matches received");
   		matches = JSON.parse(body);
   		console.log(matches);
   		console.log(matches.length);

   		for(var i = 0; i < matches.length; i++){
   			request({ url: 'http://localhost:2403/odds?matchReference=' + matches[i].id, method: 'GET'}, callback_odds);
   			request({ url: 'http://localhost:2403/expertpredictions?matchReference=' + matches[i].id, method: 'GET'}, callback_predictions);

   		}


   		} else {
   			console.log("failed " + error);
   		}
   	};

function callback_predictions(error, response, body) {
 		 if (!error && response.statusCode == 200) {
   		 var predictionsValid = false;
   		 console.log("predictions received");
   		 predictions = JSON.parse(body);
   		 if (predictions.length !== 0) {
   		 console.log(predictions);
   		 console.log(predictions.length);

   		 if(predictions.length < 2) {
   		 	console.log('not enough predictions to make a decision. At least two of the same type are required.');
   		 } else {
   		 	console.log('Calculating the most likely match outcome based on the expert predictions...');

   		 	//MAGIC CALCULATION HAPPENING HERE:


   		 }
   		}
   		} else {
   			console.log("failed " + error);
   		}
   	};

function callback_odds(error, response, body) {
 		if (!error && response.statusCode == 200) {
   			console.log("odds received");
   			odds = JSON.parse(body);
   		if (odds.length !== 0) {
   			console.log(odds);
   			console.log(odds.length);

   		//MAGIC CALCULATION HAPPENING HERE:
   		var sumOddHome = 0;
   		var avgOddHome = 0
   		var avgProbHome = 0;
   		var maxOddHome = 0;
   		var maxOddDataHome = [];
   		var maxOddHome = 0;
   		var kellyHome = 0;
   		var sumOddDraw = 0;
   		var avgOddDraw = 0
   		var avgProbDraw = 0;
   		var maxOddDraw = 0;
   		var maxOddDataDraw = [];
   		var maxOddDraw = 0;
   		var kellyDraw = 0;
   		var sumOddAway = 0;
   		var avgOddAway = 0
   		var avgProbAway = 0;
   		var maxOddAway = 0;
   		var maxOddDataAway = [];
   		var maxOddAway = 0;
   		var kellyAway = 0;
   		for (var m = 0; m < odds.length; m++) {
   			maxOddDataHome.push(odds[m].homeOdds);
   			sumOddHome += odds[m].homeOdds;
   			avgOddHome = sumOddHome / odds.length;
   			avgProbHome = 100 / avgOddHome;  
   			maxOddDataDraw.push(odds[m].drawOdds);
   			sumOddDraw += odds[m].drawOdds;
   			avgOddDraw = sumOddDraw / odds.length;
   			avgProbDraw = 100 / avgOddDraw;
   			maxOddDataAway.push(odds[m].awayOdds);
   			sumOddAway += odds[m].awayOdds;
   			avgOddAway = sumOddAway / odds.length;
   			avgProbAway = 100 / avgOddAway;
   		};
   			console.log(avgOddHome);
   			console.log(avgProbHome);
   			maxOddHome = Math.max.apply(Math, maxOddDataHome);
   			console.log(maxOddHome);
   			kellyHome = ((avgProbHome / 100 * maxOddHome)-1) / (maxOddHome - 1);
   			console.log('Kelly Investment for Home ' + kellyHome);
   			console.log(1000 * kellyHome);
   			console.log(avgOddDraw);
   			console.log(avgProbDraw);
   			maxOddDraw = Math.max.apply(Math, maxOddDataDraw);
   			console.log(maxOddDraw);
   			kellyDraw = ((avgProbDraw / 100 * maxOddDraw)-1) / (maxOddDraw - 1);
   			console.log('Kelly Investment for Draw ' + kellyDraw);
   			console.log(1000 * kellyDraw);
   			console.log(avgOddAway);
   			console.log(avgProbAway);
   			maxOddAway = Math.max.apply(Math, maxOddDataAway);
   			console.log(maxOddAway);
   			kellyAway = ((avgProbAway / 100 * maxOddAway)-1) / (maxOddAway - 1);
   			console.log('Kelly Investment for Away ' + kellyAway);
   			console.log(1000 * kellyAway);

   		}
   		} else {
   			console.log("failed " + error);
   		}
   	};



//request({ url: 'http://localhost:2403/expertpredictions?matchReference=766fef2309832832', method: 'GET'}, callback_predictions);
//request({ url: 'http://localhost:2403/odds?matchReference=766fef2309832832', method: 'GET'}, callback_odds);

var query = JSON.stringify({'matchStatus': {$ne: 'Finished'}});
request({ url: 'http://localhost:2403/matches/?' + query, method: 'GET'}, callback_matches);
