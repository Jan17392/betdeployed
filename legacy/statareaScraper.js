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


function callback(error, response, body) {
 	 //console.log(response);
 		 if (!error && response.statusCode == 200) {
   		 console.log("successfully created");
   		} else {
   			console.log("failed " + error);
   		}
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
        var matchTime = $(this).children().first().text().trim().substring(6);
        var matchResult = $(this).children().first().next().next().text().trim().substring(0,3);
        var threeWayTip = $(this).children().first().next().next().next().next().text().trim();
        var over15GoalsProbability = $(this).children().first().next().next().next().next().next().next().next().next().next().next().next().next().text().trim();
        var over25GoalsProbability = $(this).children().first().next().next().next().next().next().next().next().next().next().next().next().next().next().text().trim();
        var over35GoalsProbability = $(this).children().first().next().next().next().next().next().next().next().next().next().next().next().next().next().next().text().trim();
        //var awayOdds = $(this).parent().parent().parent().next().next().next().text().trim();
        //var updateDate = new Date().toString();
        //var matchID = homeTeam.substring(0, 3) + awayTeam.substring(0, 3);
      
        odds = {
          homeProbability: homeProbability,
          drawProbability: drawProbability,
          awayProbability: awayProbability,
          matchResult: matchResult,
          matchTime: matchTime,
          homeTeam: homeTeam,
          awayTeam: awayTeam,
          threeWayTip: threeWayTip,
          over15GoalsProbability: over15GoalsProbability,
          over25GoalsProbability: over25GoalsProbability,
          over35GoalsProbability: over35GoalsProbability
          };

          var options = {
            method: 'POST',
            url: 'https://hooks.zapier.com/hooks/catch/528457/41p6dn/',
            headers: {'Content-Type': 'application/json'},
            form: odds       
         };

      //request(options, callback);
      
        console.log(odds);

        });
    });

}
