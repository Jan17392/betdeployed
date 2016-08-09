var bettingclosedRun = function(){


var request = require('request');
var cheerio = require('cheerio');
var moment = require('moment');

var daysToCheck = [
    moment().format('YYYY-MM-DD'), 
    moment().add(1, 'days').format('YYYY-MM-DD'), 
    moment().add(2, 'days').format('YYYY-MM-DD'),
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
      url = 'http://www.bettingclosed.com/predictions/date-matches/' + daysToCheck[x] + '?format=raw&firstLoad=TRUE';
      console.log(url);
    

        request(url, {jar: true}, function(error, response, body) {
          var data1 = JSON.parse(body);

          //console.log(data1.data[0].rows[0].idChampion);

          for(var i = 0; i < data1.data[0].rows.length; i++){
            var homeTeam = data1.data[0].rows[i].teamHomeExt;
            var bettingPrediction = data1.data[0].rows[i].prediction;
            var awayTeam = data1.data[0].rows[i].teamAwayExt;
            var bettingType = data1.data[0].rows[i].type;
          
          if(bettingPrediction == "1"){
            var homeProbability = 63;
            var drawProbability = 25;
            var awayProbability = 12;
          } else if(bettingPrediction == "1x"){
            var homeProbability = 50;
            var drawProbability = 40;
            var awayProbability = 10;
          } else if (bettingPrediction == "12"){
            var homeProbability = 33;
            var drawProbability = 33;
            var awayProbability = 33;
          } else if (bettingPrediction == "x2"){
            var homeProbability = 10;
            var drawProbability = 40;
            var awayProbability = 50;
          } else if (bettingPrediction == "2"){
            var homeProbability = 12;
            var drawProbability = 25;
            var awayProbability = 63;
          } else if (bettingPrediction == "x"){
            var homeProbability = 30;
            var drawProbability = 40;
            var awayProbability = 30;
          }

            odds = {
          createdDate: new Date(),
          homeTeam: homeTeam,
          homeProbability: parseInt(homeProbability),
          drawProbability: parseInt(drawProbability),
          awayProbability: parseInt(awayProbability),
          bettingPrediction: bettingPrediction,
          awayTeam: awayTeam,
          expertId: 'bettingclosed',
          matchDate: data1.data[0].rows[i].dateMatchTZ,
          bettingPrediction: bettingPrediction,
          bettingType: bettingType,
          matchId: data1.data[0].rows[i].teamHomeExt.substring(0, 3) + data1.data[0].rows[i].teamAwayExt.substring(0, 3) + data1.data[0].rows[i].dateMatchTZ.substring(0, 5)
          };



            if(existingpredictionsID.indexOf(odds.matchId) !== -1 && existingpredictionsExpert[existingpredictionsID.indexOf(odds.matchId)] == odds.expertId){
            console.log("successfully updated expertprediction from " + odds.expertId);

            var options = {
            method: 'PUT',
            url: 'http://localhost:2403/expertpredictions/?id=' + existingpredictionsNativeID[existingpredictionsID.indexOf(odds.matchId)],
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

        };
    });

};
});


}
exports.bettingclosedRun = bettingclosedRun;
