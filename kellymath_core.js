var kellymathRun = function(){

  var request = require('request');
var stringify = require('stringify');
var math = require('mathjs');

var predictions = [];
var odds = [];
var matches = [];
var bet = {};

function settingTimeout(){
	console.log("setting Timeout");
}

function callback(error, response, body) {
 	 //console.log(response);
 		 if (!error && response.statusCode == 200) {
   		 console.log("successfully created");
   		} else {
   			console.log("failed " + error);
   		}
   	};

function callback_matches(error, response, body) {
 		if (!error && response.statusCode == 200) {
   		console.log("matches received");
   		matches = JSON.parse(body);
   		console.log(matches);
   		console.log(matches.length);

   		for(var i = 0; i < matches.length; i++){
   			request({ url: 'http://localhost:2403/odds?matchReference=' + matches[i].id, method: 'GET'}, callback_odds);
   			setTimeout(settingTimeout, 10000);
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
   		 	var expertsHomeProbabilitySum = 0;
   		 	var expertsDrawProbabilitySum = 0;
   		 	var expertsAwayProbabilitySum = 0;
   		 	var bettingChoice = "";


   		 	for(var s = 0; s < predictions.length; s++){
   		 	var sumExperts = predictions.length;
   		 	expertsHomeProbabilitySum += predictions[s].homeProbability;
   		 	expertsDrawProbabilitySum += predictions[s].drawProbability;
   		 	expertsAwayProbabilitySum += predictions[s].awayProbability;

			}

			var expertsHomeProbability = expertsHomeProbabilitySum / sumExperts;
			var expertsDrawProbability = expertsDrawProbabilitySum / sumExperts;
			var expertsAwayProbability = expertsAwayProbabilitySum / sumExperts;
			console.log(expertsHomeProbability);
			console.log(expertsDrawProbability);
			console.log(expertsAwayProbability);
			if(Math.max(expertsHomeProbability, expertsDrawProbability, expertsAwayProbability) == expertsHomeProbability){
				console.log("bet on Home!");
				var bettingChoice = "1";
			} else if(Math.max(expertsHomeProbability, expertsDrawProbability, expertsAwayProbability) == expertsDrawProbability){
				console.log("bet on Draw!");
				var bettingChoice = "X";
			} else if(Math.max(expertsHomeProbability, expertsDrawProbability, expertsAwayProbability) == expertsAwayProbability){
				console.log("bet on Away!");
				var bettingChoice = "2"

			}

			bet = {
          matchReference: predictions[0].matchReference,
          bettingChoice: bettingChoice

          };

          var options = {
            method: 'PUT',
            url: 'http://localhost:2403/matches/?id=' + predictions[0].matchReference,
            //ACTUALLY HERE I NEED TO FIND THE BETS ID WHERE TO UPDATE
            headers: {'Content-Type': 'application/json'},
            form: bet       
         };

        request(options, callback);

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
   		if (odds.length > 1) {
   			console.log(odds);
   			console.log(odds.length);

   		//MAGIC CALCULATION HAPPENING HERE:
   		var sumOddHome = 0;
   		var avgOddHome = 0
   		var avgProbHome = 0;
   		var maxOddDataHome = [];
   		var maxOddHome = 0;
   		var kellyHome = 0;
   		var sumOddDraw = 0;
   		var avgOddDraw = 0
   		var avgProbDraw = 0;
   		var maxOddDataDraw = [];
   		var maxOddDraw = 0;
   		var kellyDraw = 0;
   		var sumOddAway = 0;
   		var avgOddAway = 0
   		var avgProbAway = 0;
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
        var providerIndexHome = maxOddDataHome.indexOf(maxOddHome);
        var providerHome = odds[providerIndexHome].bookmaker;
   			console.log(maxOddHome);
   			if(((avgProbHome / 100 * maxOddHome)-1) <= 0){
   				kellyHome = 0
   			} else {
   				kellyHome = ((avgProbHome / 100 * maxOddHome)-1) / (maxOddHome - 1);
   			};
   			console.log('Kelly Investment for Home ' + kellyHome);
   			console.log(1000 * kellyHome);
   			console.log(avgOddDraw);
   			console.log(avgProbDraw);
   			maxOddDraw = Math.max.apply(Math, maxOddDataDraw);
        var providerIndexDraw = maxOddDataDraw.indexOf(maxOddDraw);
        var providerDraw = odds[providerIndexDraw].bookmaker;
   			console.log(maxOddDraw);
   			if(((avgProbDraw / 100 * maxOddDraw)-1) <= 0){
   				kellyDraw = 0
   			} else {
   				kellyDraw = ((avgProbDraw / 100 * maxOddDraw)-1) / (maxOddDraw - 1)
   			};
   			console.log('Kelly Investment for Draw ' + kellyDraw);
   			console.log(1000 * kellyDraw);
   			console.log(avgOddAway);
   			console.log(avgProbAway);
   			maxOddAway = Math.max.apply(Math, maxOddDataAway);
        var providerIndexAway = maxOddDataAway.indexOf(maxOddAway);
        var providerAway = odds[providerIndexAway].bookmaker;
   			console.log(maxOddAway);
   			if(((avgProbAway / 100 * maxOddAway)-1) <= 0){
   				kellyAway = 0
   			} else {
   				kellyAway = ((avgProbAway / 100 * maxOddAway)-1) / (maxOddAway - 1);
   			};
   			console.log('Kelly Investment for Away ' + kellyAway);
   			console.log(1000 * kellyAway);

        if(kellyAway > 0.1){
          kellyAway = 0.1
        } else if (kellyDraw > 0.1) {
          kellyDraw = 0.1
        } else if (kellyHome) {
          kellyHome = 0.1
        }


   		bet = {
          matchReference: odds[0].matchReference,
          //bettingType:
          //bettingChoice:
          //amountToBet:
          //betWon:
          //amountReceived:
          createdDate: new Date(),
          //updatedDate:
          //betPlaced:
          avgOddHome: avgOddHome,
          avgOddDraw: avgOddDraw,
          avgOddAway: avgOddAway,
          avgProbHome: avgProbHome,
          avgProbDraw: avgProbDraw,
          avgProbAway: avgProbAway,
          maxOddHome: maxOddHome,
          maxOddDraw: maxOddDraw,
          maxOddAway: maxOddAway,
          kellyPercentageHome: kellyHome,
          kellyPercentageDraw: kellyDraw,
          kellyPercentageAway: kellyAway,
          providerHome: providerHome,
          providerDraw: providerDraw,
          providerAway: providerAway
          };

          var options = {
            method: 'PUT',
            url: 'http://localhost:2403/matches/?id=' + odds[0].matchReference,
            headers: {'Content-Type': 'application/json'},
            form: bet       
         };

        request(options, callback);

   		}
   		} else {
   			console.log("failed, not sufficient odds to compare" + error);
   		}
   	};


var query = JSON.stringify({'matchStatus': {$ne: 'Finished'}});
request({ url: 'http://localhost:2403/matches/?' + query, method: 'GET'}, callback_matches);


}
exports.kellymathRun = kellymathRun;