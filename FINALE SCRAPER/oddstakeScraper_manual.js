//var oddstakeRun = function(){


var request = require('request');
var cheerio = require('cheerio');
var moment = require('moment');



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

        

        request('http://www.oddstake.com/tips/', {jar: true}, function(error, response, body) {

        var $ = cheerio.load(body);

        $('.tpkod').each(function( index ) {
        var awayTeam = $(this).prev().text().trim();
        var homeTeam = $(this).prev().prev().text().trim();
        var matchTime = moment().format('DD-MM');
        var bettingType = $(this).next().next().next().next().text().trim();
        if(bettingType == 1){
          var homeProbability = $(this).next().next().text().trim();
          var drawProbability = (100 - parseInt(homeProbability)) / 1.33;
          var awayProbability = 100 - parseInt(homeProbability) - parseInt(drawProbability);
        } else if(bettingType == 2){
          var awayProbability = $(this).next().next().text().trim();
          var drawProbability = (100 - parseInt(awayProbability)) / 1.33;
          var homeProbability = 100 - parseInt(awayProbability) - parseInt(drawProbability);          
        } else if(bettingType == "X"){
          var drawProbability = $(this).next().next().text().trim();        
          var awayProbability = (100 - parseInt(drawProbability)) / 2;
          var homeProbability = (100 - parseInt(drawProbability)) / 2; 
        }
        var matchID = homeTeam.substring(0, 3) + awayTeam.substring(0, 3) + matchTime.substring(0, 5);
      
        odds = {
          //winProbability: parseInt(winProbability),
          homeProbability: parseInt(homeProbability),
          drawProbability: parseInt(drawProbability),
          awayProbability: parseInt(awayProbability),
          createdDate: new Date(),
          homeTeam: homeTeam,
          awayTeam: awayTeam,
          expertId: 'oddstake',
          bettingType: '1X2',
          bettingPrediction: bettingType,
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
    });


//}
//exports.oddstakeRun = oddstakeRun;
