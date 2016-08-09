//var predictzRun = function(){


var request = require('request');
var cheerio = require('cheerio');
var moment = require('moment');

var daysToCheck = [
    '', 
    'tommorrow', 
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
      url = "http://www.predictz.com/predictions/" + daysToCheck[x];
      console.log(url);
    

        request(url, {jar: true}, function(error, response, body) {

        var $ = cheerio.load(body);

        $('.indexpred').each(function( index ) {
        var homeScorePredicted = $(this).children().next().text().trim().toString().split('-').shift().trim();
        var awayTeam = $(this).prev().prev().prev().prev().prev().text().trim().toString().split(' v ').pop().trim();
        var awayScorePredicted = $(this).children().next().text().trim().toString().split('-').pop().trim();
        var homeTeam = $(this).prev().prev().prev().prev().prev().text().trim().toString().split(' v ').shift().trim();
        var matchDays = $('.bxttl.bxttltxt').text().trim().slice(-10).substring(0, 2);
        var createdDate = new Date();
        var matchID = homeTeam.substring(0, 3) + awayTeam.substring(0, 3) + matchDays + "-" + moment().format('MM');
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

        console.log(matchDays);
      
        odds = {
          homeProbability: parseInt(homeProbability),
          drawProbability: parseInt(drawProbability),
          awayProbability: parseInt(awayProbability),
          homeScorePredicted: parseInt(homeScorePredicted),
          awayScorePredicted: parseInt(awayScorePredicted),
          createdDate: createdDate,
          matchDate: matchDays + "-" + moment().format('MM'),
          homeTeam: homeTeam,
          awayTeam: awayTeam,
          expertId: 'predictz',
          bettingType: '1X2',
          matchId: matchID
          };

          if(homeTeam !== ""){

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
         }      
        console.log(odds);
      

        });
    });

}
});

//}
//exports.predictzRun = predictzRun;