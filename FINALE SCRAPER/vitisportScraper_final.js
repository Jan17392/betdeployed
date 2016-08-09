var vitisportRun = function(){

var request = require('request');
var cheerio = require('cheerio');

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
      

        request('http://www.vitisport.de/index.php?clanek=quicktips&sekce=fotbal&lang=de', {jar: true}, function(error, response, body) {

        var $ = cheerio.load(body);

        $('.barvapodtipek10').each(function( index ) {
        var homeProbability = $(this).prev().prev().prev().text().trim();
        var drawProbability = $(this).prev().prev().text().trim();
        var awayProbability = $(this).prev().text().trim();
        var awayTeam = $(this).prev().prev().prev().prev().prev().prev().prev().text().trim();
        var homeTeam = $(this).prev().prev().prev().prev().prev().prev().prev().prev().text().trim();
        var matchTime = $(this).prev().prev().prev().prev().prev().prev().prev().prev().prev().text().trim().replace('.', '-');
        var homeGoalsPrediction = $(this).prev().prev().prev().prev().prev().prev().text().trim();
        var awayGoalsPrediction = $(this).prev().prev().prev().prev().text().trim();
        //var updateDate = new Date().toString();
        var matchID = homeTeam.substring(0, 3) + awayTeam.substring(0, 3) + matchTime;
      
        odds = {
          homeProbability: parseInt(homeProbability),
          drawProbability: parseInt(drawProbability),
          awayProbability: parseInt(awayProbability),
          matchDate: matchTime,
          homeTeam: homeTeam,
          awayTeam: awayTeam,
          homeScorePredicted: parseInt(homeGoalsPrediction),
          awayScorePredicted: parseInt(awayGoalsPrediction),
          matchId: matchID,
          createdDate: new Date(),
          expertId: 'vitisport',
          bettingType: '1X2'
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

        });
    });

});

}
exports.vitisportRun = vitisportRun;