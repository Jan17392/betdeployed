//var windrawwinRun = function(){


var request = require('request');
var cheerio = require('cheerio');
var moment = require('moment');

var existingpredictionsID = [];
var existingpredictionsExpert = [];
var existingpredictionsNativeID = [];

var daysToCheck = [
    moment().format('YYYYMMDD'), 
    moment().add(1, 'days').format('YYYYMMDD'), 
    moment().add(2, 'days').format('YYYYMMDD'), 
    moment().add(3, 'days').format('YYYYMMDD'), 
    moment().add(4, 'days').format('YYYYMMDD'), 
    moment().add(5, 'days').format('YYYYMMDD')
    ];

var awayTeam = "";
var homeTeam = "";
var awayTeamName = [];
var urlsToScrape = [];
var odds = "";
var url = "";


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
      url = "http://www.windrawwin.com/predictions/future/" + daysToCheck[x] + '/';
      console.log(url);
    

        request(url, {jar: true}, function(error, response, body) {

        var $ = cheerio.load(body);

        $('.fixt').each(function( index ) {
        var awayTeam = $(this).text().trim().toString().split(' v ').pop().trim();
        var homeTeam = $(this).text().trim().toString().split(' v ').shift().trim();
        var matchTime = $('.sec').text().trim().toString().split('FILTER').shift().slice(-10).substring(0, 2) + '-07';
        var homeScorePredicted = $(this).next().next().next().next().next().next().next().next().next().next().next().next().next().text().trim().toString().split('-').shift().trim();
        var awayScorePredicted = $(this).next().next().next().next().next().next().next().next().next().next().next().next().next().text().trim().toString().split('-').pop().trim();
        var matchID = homeTeam.substring(0, 3) + awayTeam.substring(0, 3) + matchTime.substring(0, 5);
        var goalDifference = parseInt(homeScorePredicted) - parseInt(awayScorePredicted)
        if(goalDifference == 0){
          var homeProbability = 30;
          var drawProbability = 40;
          var awayProbability = 30;
        } else if(goalDifference > 0){
          var homeProbability = (goalDifference * goalDifference)/(goalDifference + 1) * 10 + 50;
          var drawProbability = (100 - homeProbability) / 1.33;
          var awayProbability = 100 - homeProbability - drawProbability;
        } else if (goalDifference < 0){    
          var awayProbability = (goalDifference * goalDifference)/(goalDifference * (-1) + 1) * 10 + 50;
          var drawProbability = (100 - awayProbability) / 1.33;
          var homeProbability = 100 - awayProbability - drawProbability;
        }
      
        odds = {
          homeProbability: parseInt(homeProbability),
          drawProbability: parseInt(drawProbability),
          awayProbability: parseInt(awayProbability),
          homeScorePredicted: parseInt(homeScorePredicted),
          awayScorePredicted: parseInt(awayScorePredicted),
          createdDate: new Date(),
          homeTeam: homeTeam,
          awayTeam: awayTeam,
          expertId: 'windrawwin',
          bettingType: '1X2',
          matchId: matchID,
          matchDate: matchTime
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

});



//}
//exports.windrawwinRun = windrawwinRun;
