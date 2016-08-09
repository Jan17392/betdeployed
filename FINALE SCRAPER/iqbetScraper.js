var iqbetRun = function(){


var request = require('request');
var cheerio = require('cheerio');

var daysToCheck = [
    'http://iq-bet.com/',
    'http://iq-bet.com/?limit=100&day=0&country=',
    'http://iq-bet.com/?day=1&title=Tomorrow&country=',
    'http://iq-bet.com/?limit=100&day=1&title=Tomorrow&country='
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
      url = daysToCheck[x];
      console.log(url);
    

        request(url, {jar: true}, function(error, response, body) {

        var $ = cheerio.load(body);

        $('.bar-colours').each(function( index ) {
        var homeProbability = $(this).text().trim().toString().split(',').shift().trim();
        var drawProbabilitySupport = $(this).text().trim().toString().split(',');
        var drawProbability = drawProbabilitySupport[1];
        var awayProbability = $(this).text().trim().toString().split(',').pop().trim();
        var bettingPrediction = $(this).parent().prev().children().text().trim();
        var awayTeam = $(this).parent().prev().prev().prev().prev().prev().prev().prev().prev().prev().text().trim();
        var homeTeam = $(this).parent().prev().prev().prev().prev().prev().prev().prev().prev().prev().prev().text().trim();
        var matchTimeSupport = $('#title_main').text().split('\n\n\n').shift().trim();
        var matchTime = matchTimeSupport.split('Odds Comparison ').pop() + ' ' + $(this).parent().prev().prev().prev().prev().prev().prev().prev().prev().prev().prev().prev().prev().text().trim();;
        var matchID = homeTeam.substring(0, 3) + awayTeam.substring(0, 3) + matchTime.substring(0, 5);
      
        odds = {
          homeProbability: parseInt(homeProbability),
          drawProbability: parseInt(drawProbability),
          awayProbability: parseInt(awayProbability),
          createdDate: new Date(),
          homeTeam: homeTeam,
          bettingPrediction: bettingPrediction,
          awayTeam: awayTeam,
          expertId: 'iq-bet',
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
    }
  })


}
exports.iqbetRun = iqbetRun;
