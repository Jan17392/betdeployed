var propredictionsRun = function(){

var request = require('request');
var cheerio = require('cheerio');

var existingpredictionsID = [];
var existingpredictionsExpert = [];
var existingpredictionsNativeID = [];

var url = [
            'http://premierleague.propredictions.eu/', 
            'http://bundesliga.propredictions.eu/',
            'http://primera.propredictions.eu/',
            'http://seriea.propredictions.eu/',
            'http://ligue1.propredictions.eu/'
          ]

//callback function for the API request section
function callback(error, response, body) {
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
      var homeScorePredicted = splitScore[0].trim();
      var awayScorePredicted = splitScore[1].trim();

      var matchID = homeTeam.substring(0, 3) + awayTeam.substring(0, 3) + matchDate.substring(0, 5).replace('.','-');
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
  
      var odds = {
        matchDate: matchDate,
        homeTeam: homeTeam,
        awayTeam: awayTeam,
        homeProbability: parseInt(homeProbability),
        drawProbability: parseInt(drawProbability),
        awayProbability: parseInt(awayProbability),
        //predictedScore: predictedScore,
        overUnder25Prediction: overUnder25Pred,
        asianHandicapPrediction: asianHandicapPred,
        homeScorePredicted: parseInt(homeScorePredicted),
        expertId: 'propredictions',
        bettingPrediction: winningTeam,
        bettingType: "1X2",
        awayScorePredicted: parseInt(awayScorePredicted),
        createdDate: new Date(),
        matchId: matchID
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
      }

        });
    });

}
});

}
exports.propredictionsRun = propredictionsRun;