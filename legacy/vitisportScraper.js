var request = require('request');
var cheerio = require('cheerio');

function callback(error, response, body) {
 	 //console.log(response);
 		 if (!error && response.statusCode == 200) {
   		 console.log("successfully created");
   		} else {
   			console.log("failed " + error);
   		}
   	};

        request('http://www.vitisport.de/index.php?clanek=quicktips&sekce=fotbal&lang=de', {jar: true}, function(error, response, body) {

        var $ = cheerio.load(body);

        $('.barvapodtipek10').each(function( index ) {
        var homeProbability = $(this).prev().prev().prev().text().trim();
        var drawProbability = $(this).prev().prev().text().trim();
        var awayProbability = $(this).prev().text().trim();
        var awayTeam = $(this).prev().prev().prev().prev().prev().prev().prev().text().trim();
        var homeTeam = $(this).prev().prev().prev().prev().prev().prev().prev().prev().text().trim();
        var matchTime = $(this).prev().prev().prev().prev().prev().prev().prev().prev().prev().text().trim();
        var homeGoalsPrediction = $(this).prev().prev().prev().prev().prev().prev().text().trim();
        var awayGoalsPrediction = $(this).prev().prev().prev().prev().text().trim();
        //var updateDate = new Date().toString();
        //var matchID = homeTeam.substring(0, 3) + awayTeam.substring(0, 3);
      
        odds = {
          homeProbability: homeProbability,
          drawProbability: drawProbability,
          awayProbability: awayProbability,
          matchTime: matchTime,
          homeTeam: homeTeam,
          awayTeam: awayTeam,
          homeGoalsPrediction: homeGoalsPrediction,
          awayGoalsPrediction: awayGoalsPrediction
          //matchID: matchID
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


