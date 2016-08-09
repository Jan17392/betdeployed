var request = require('request');
var cheerio = require('cheerio');
var moment = require('moment');

var daysToCheck = [
    moment().format('DD-MM-YYYY'), 
    moment().add(1, 'days').format('DD-MM-YYYY'), 
    moment().add(2, 'days').format('DD-MM-YYYY'), 
    moment().add(3, 'days').format('DD-MM-YYYY'), 
    moment().add(4, 'days').format('DD-MM-YYYY'), 
    moment().add(5, 'days').format('DD-MM-YYYY')
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




    for(var x = 0; x < 1; x++) {
      url = "http://www.zulubet.com/tips-" + daysToCheck[x] + '.html';
      console.log(url);
    

        request(url, {jar: true}, function(error, response, body) {

        var $ = cheerio.load(body);

        $('.prob2.aver_odds_min').each(function( index ) {
        var homeProbability = $(this).prev().prev().prev().prev().prev().text().trim();
        var drawProbability = $(this).prev().prev().prev().prev().text().trim();
        var awayProbability = $(this).prev().prev().prev().text().trim();
        var awayTeam = $(this).prev().prev().prev().prev().prev().prev().prev().text().trim().toString().split('-').pop().trim();
        var homeTeam = $(this).prev().prev().prev().prev().prev().prev().prev().text().trim().toString().split('-').pop().trim();
        var matchTime = $(this).prev().prev().prev().prev().prev().prev().prev().prev().text().trim().toString().split(';').pop();
        //var drawOdds = $(this).parent().parent().parent().next().next().text().trim();
        //var awayOdds = $(this).parent().parent().parent().next().next().next().text().trim();
        //var updateDate = new Date().toString();
        //var matchID = homeTeam.substring(0, 3) + awayTeam.substring(0, 3);
      
        odds = {
          homeProbability: homeProbability,
          drawProbability: drawProbability,
          awayProbability: awayProbability,
          //teamNames: teamNames,
          matchTime: matchTime,
          homeTeam: homeTeam,
          awayTeam: awayTeam
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

}
