var statareaRun = function(){

var request = require('request');
var cheerio = require('cheerio');
var moment = require('moment');

var daysToCheck = [
    moment().format('YYYY-MM-DD'), 
    moment().add(1, 'days').format('YYYY-MM-DD'), 
    moment().add(2, 'days').format('YYYY-MM-DD'), 
    moment().add(3, 'days').format('YYYY-MM-DD'), 
    moment().add(4, 'days').format('YYYY-MM-DD'), 
    moment().add(5, 'days').format('YYYY-MM-DD')
    ];

var awayTeam = "";
var homeTeam = "";
var awayTeamName = [];
var urlsToScrape = [];
var odds = "";
var url = "";
var existingpredictionsID = [];
var existingpredictionsExpert = [];
var existingpredictionsNativeID = [];


function callback(error, response, body) {
 	 //console.log(response);
 		 if (!error && response.statusCode == 200) {
   		 console.log("successfully created");
   		} else {
   			console.log("failed " + error);
   		}
   	};

request('http://localhost:2403/expertpredictions/', function(error, response, body) {
      var data = JSON.parse(body);

      for (var y = 0; y < data.length; y++){
      existingpredictionsID.push(data[y].matchId);
      existingpredictionsExpert.push(data[y].expertId);
      existingpredictionsNativeID.push(data[y].id);
      };



    for(var x = 0; x < daysToCheck.length; x++) {
      url = "http://statarea.com/predictions/date/" + daysToCheck[x];

        request(url, {jar: true}, function(error, response, body) {

        var $ = cheerio.load(body);
        
        $('.prdmatch').each(function( index ) {
        var homeProbability = $(this).children().first().next().next().next().next().next().next().text().trim();
        var drawProbability = $(this).children().first().next().next().next().next().next().next().next().text().trim();
        var awayProbability = $(this).children().first().next().next().next().next().next().next().next().next().text().trim();
        var awayTeam = $(this).children().first().next().next().next().text().trim();
        var homeTeam = $(this).children().first().next().text().trim();
        var matchTime = $(this).children().first().text().trim().substring(11);
        var matchResult = $(this).children().first().next().next().text().trim().substring(0,3);
        var threeWayTip = $(this).children().first().next().next().next().next().text().trim();
        var over15GoalsProbability = $(this).children().first().next().next().next().next().next().next().next().next().next().next().next().next().text().trim();
        var over25GoalsProbability = $(this).children().first().next().next().next().next().next().next().next().next().next().next().next().next().next().text().trim();
        var over35GoalsProbability = $(this).children().first().next().next().next().next().next().next().next().next().next().next().next().next().next().next().text().trim();
        var matchID = homeTeam.substring(0, 3) + awayTeam.substring(0, 3) + matchTime;
      
        odds = {
          homeProbability: parseInt(homeProbability),
          drawProbability: parseInt(drawProbability),
          awayProbability: parseInt(awayProbability),
          //matchResult: matchResult,
          matchDate: matchTime,
          homeTeam: homeTeam,
          awayTeam: awayTeam,
          bettingPrediction: threeWayTip,
          bettingType: '1X2',
          over15GoalsProbability: parseInt(over15GoalsProbability),
          over25GoalsProbability: parseInt(over25GoalsProbability),
          over35GoalsProbability: parseInt(over35GoalsProbability),
          expertId: 'statarea',
          matchId: matchID,
          createdDate: new Date()
          };

          if(existingpredictionsID.indexOf(matchID) !== -1 && existingpredictionsExpert[existingpredictionsID.indexOf(matchID)] == odds.expertId){
            console.log("successfully updated expertprediction from " + odds.expertId);

            var options = {
            method: 'PUT',
            url: 'http://localhost:2403/expertpredictions/?id=' + existingpredictionsNativeID[existingpredictionsID.indexOf(matchID)],
            headers: {'Content-Type': 'application/json'},
            form: odds       
            };
            request(options, callback);
          } else {
            console.log("successfully created expertprediction from " + odds.expertId)

            var options = {
            method: 'POST',
            url: 'http://localhost:2403/expertpredictions/',
            headers: {'Content-Type': 'application/json'},
            form: odds       
            };
            request(options, callback);
          }

        console.log(odds);
      })

        });
    };

})


}
exports.statareaRun = statareaRun;
