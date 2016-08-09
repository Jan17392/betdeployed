var request = require('request');
var cheerio = require('cheerio');
var fs = require('fs');

//callback function for the API request section
function callback(error, response, body) {
 		 if (!error && response.statusCode == 200) {
   		 console.log("successfully created");
   		} else {
   			console.log("failed " + error);
   		}
   	};

  var url = ['http://premierleague.propredictions.eu/', 
              'http://bundesliga.propredictions.eu/',
              'http://primera.propredictions.eu/',
              'http://seriea.propredictions.eu/',
              'http://ligue1.propredictions.eu/']

  //var url = "http://premierleague.propredictions.eu/";

for(var u = 0; u < url.length; u++) {
  request(url[u], {jar: true}, function(error, response, body) {
    if(error) {
      console.log("Error: " + error);
    }
    console.log("Status code: " + response.statusCode);
    //console.log(body);

    var $ = cheerio.load(body);
  
    $('#table1').each(function( index ) {
      var length = $(this).children().children().length;

      for(var s = 0; s < (length - 1); s++) {
      var matchDate = $(this).children().children().next().children().slice(11 * s ).eq(0).text().trim();
      var matchTime = $(this).children().children().next().children().slice(1 + (11 * s) ).eq(0).text().trim();
      var teams = $(this).children().children().next().children().slice(2 + (11 * s) ).eq(0).text().trim();
      var predictedScore = $(this).children().children().next().children().slice(3 + (11 * s) ).eq(0).text().trim();
      var winningTeam = $(this).children().children().next().children().slice(5 + (11 * s) ).eq(0).text().trim();
      var overUnder25Pred = $(this).children().children().next().children().slice(7 + (11 * s) ).eq(0).text().trim();
      var asianHandicapPred = $(this).children().children().next().children().slice(9 + (11 * s) ).eq(0).text().trim();
      var actualScore = $(this).children().children().next().children().slice(10 + (11 * s) ).eq(0).text().trim();

      var splitTeams = teams.split("-");
      var homeTeam = splitTeams[0].trim();
      var awayTeam = splitTeams[1].trim();

      var splitScore = predictedScore.split(":");
      var homeGoals = splitScore[0].trim();
      var awayGoals = splitScore[1].trim();

      var matchID = homeTeam.substring(0, 3) + awayTeam.substring(0, 3) + matchDate.substring(0, 5);
  
      var json = {
        matchDate: matchDate,
        matchTime: matchTime,
        homeTeam: homeTeam,
        awayTeam: awayTeam,
        predictedScore: predictedScore,
        winningTeam: winningTeam,
        overUnder25Pred: overUnder25Pred,
        asianHandicapPred: asianHandicapPred,
        homeGoals: homeGoals,
        awayGoals: awayGoals,
        updateDate: new Date(),
        matchID: matchID
        };

      console.log(json);

      options = {
          method: 'POST',
          url: 'https://hooks.zapier.com/hooks/catch/528457/41waov/',
          headers: {'Content-Type': 'application/json'},
          form: json
        };

      request(options, callback);
      }
      });
    });
  };
