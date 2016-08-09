var forebetRun = function(){


var request = require('request');
var cheerio = require('cheerio');
var moment = require('moment');

var daysToCheck = [
          'http://www.forebet.com/de/fussballprognosen-fur-heute/fussball-prognosen-1x2',
          'http://www.forebet.com/de/fussballprognose-fur-morgen/fussball-prognosen-1x2'
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

        $('.predict').each(function( index ) {
        var homeProbability = $(this).prev().prev().prev().text().trim();
        var drawProbability = $(this).prev().prev().text().trim();
        var awayProbability = $(this).prev().text().trim();
        if($(this).prev().prev().prev().prev().children().next().html() !== null){
          var awayTeamSupport = $(this).prev().prev().prev().prev().children().next().html().split('<br>').pop().trim().length;
          var awayTeamSupport2 = $(this).prev().prev().prev().prev().children().next().text().trim().slice(0, -16);
          var homeTeamSupport = $(this).prev().prev().prev().prev().children().next().html().split('<br>').shift().trim().length;
          var homeTeam = $(this).prev().prev().prev().prev().children().next().text().trim().substring(0, $(this).prev().prev().prev().prev().children().next().html().split('<br>').pop().trim().length);
          var awayTeam = awayTeamSupport2.slice(-awayTeamSupport);

          var matchTime = $(this).prev().prev().prev().prev().text().trim().toString().split("\n\t\t").pop().trim();
          var bettingPrediction = $(this).text().trim();
          var homeScorePredicted = $(this).next().text().trim().toString().split(' - ').shift().trim();
          var awayScorePredicted = $(this).next().text().trim().toString().split(' - ').pop().trim();
          var matchID = homeTeam.substring(0, 3) + awayTeam.substring(0, 3) + matchTime.replace('/', '-').substring(0, 5);
      
        odds = {
          homeProbability: parseInt(homeProbability),
          drawProbability: parseInt(drawProbability),
          awayProbability: parseInt(awayProbability),
          createdDate: new Date(),
          homeTeam: homeTeam,
          bettingPrediction: bettingPrediction,
          homeScorePredicted: parseInt(homeScorePredicted),
          awayScorePredicted: parseInt(awayScorePredicted),
          awayTeam: awayTeam,
          expertId: 'forebet',
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

        }
        
      

        console.log(odds);
      })

        });
    }
  })


}
exports.forebetRun = forebetRun;
