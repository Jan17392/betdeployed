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


function callback(error, response, body) {
 	 //console.log(response);
 		 if (!error && response.statusCode == 200) {
   		 console.log("successfully created");
   		} else {
   			console.log("failed " + error);
   		}
   	};

        

        request('http://www.oddstake.com/tips/', {jar: true}, function(error, response, body) {

        var $ = cheerio.load(body);

        $('.tpkod').each(function( index ) {
        var awayTeam = $(this).prev().text().trim();
        var homeTeam = $(this).prev().prev().text().trim();
        var matchTime = moment().format('DD-MM');
        var bettingType = $(this).next().next().next().next().text().trim();
        var winProbability = $(this).next().next().text().trim();;
        var matchID = homeTeam.substring(0, 3) + awayTeam.substring(0, 3) + matchTime.substring(0, 5);
      
        odds = {
          winProbability: parseInt(winProbability),
          createdDate: new Date(),
          homeTeam: homeTeam,
          awayTeam: awayTeam,
          expertId: 'oddstake',
          bettingPrediction: bettingType,
          bettingType: '1X2',
          matchId: matchID,
          matchDate: matchTime
          };

          var options = {
            method: 'POST',
            url: 'http://localhost:2403/expertpredictions/',
            headers: {'Content-Type': 'application/json'},
            form: odds       
         };

      request(options, callback);
      
        console.log(odds);

        });
    });

//}

//exports.oddstakeRun = oddstakeRun;
