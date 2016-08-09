//var forebetRun = function(){


var request = require('request');
var cheerio = require('cheerio');
var moment = require('moment');

var daysToCheck = [
          "http://www.prosoccer.gr/en/" + moment().format("YYYY/MM") + "/soccer-predictions-" + moment().format("YYYY-MM-DD") + ".html",
          "http://www.prosoccer.gr/en/" + moment().add(1, "days").format("YYYY/MM") + "/soccer-predictions-" + moment().add(1, "days").format("YYYY-MM-DD") + ".html",
          "http://www.prosoccer.gr/en/" + moment().add(2, "days").format("YYYY/MM") + "/soccer-predictions-" + moment().add(2, "days").format("YYYY-MM-DD") + ".html",
          "http://www.prosoccer.gr/en/" + moment().add(3, "days").format("YYYY/MM") + "/soccer-predictions-" + moment().add(3, "days").format("YYYY-MM-DD") + ".html"
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
      url = daysToCheck[x];
      console.log(url);
    

        request(url, {jar: true}, function(error, response, body) {


        var $ = cheerio.load(body);


        $('.f1 odd').each(function( index ) {
        var homeProbability = $(this).children().text().trim();
        /*var drawProbability = $(this).prev().prev().text().trim();
        var awayProbability = $(this).prev().text().trim();
        var awayTeamSupport = $(this).prev().prev().prev().prev().children().next().html().split('<br>').pop().trim().length;
        var awayTeamSupport2 = $(this).prev().prev().prev().prev().children().next().text().trim().slice(0, -16);
        var homeTeamSupport = $(this).prev().prev().prev().prev().children().next().html().split('<br>').shift().trim().length;
        var homeTeam = $(this).prev().prev().prev().prev().children().next().text().trim().substring(0, $(this).prev().prev().prev().prev().children().next().html().split('<br>').pop().trim().length);
        var awayTeam = awayTeamSupport2.slice(-awayTeamSupport);       
        var matchTime = $(this).prev().prev().prev().prev().text().trim().toString().split("\n\t\t").pop().trim();
        var bettingPrediction = $(this).text().trim();
        var homeScorePredicted = $(this).next().text().trim().toString().split(' - ').shift().trim();
        var awayScorePredicted = $(this).next().text().trim().toString().split(' - ').pop().trim();
        var matchID = homeTeam.substring(0, 3) + awayTeam.substring(0, 3) + matchTime.replace('/', '-').substring(0, 5);*/
      
        odds = {
          homeProbability: homeProbability,
         /* drawProbability: parseInt(drawProbability),
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
          matchDate: matchTime */
          };

          var options = {
            method: 'POST',
            url: 'http://localhost:2403/expert-sandbox/',
            headers: {'Content-Type': 'application/json'},
            form: odds       
         };

      //request(options, callback);
      
        console.log(odds);

        
    });

  })
}
//}

//exports.forebetRun = forebetRun;
