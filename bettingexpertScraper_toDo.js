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
      url = 'https://www.bettingexpert.com/user/profile/pau-gasol';
      console.log(url);
    

        request(url, {jar: true}, function(error, response, body) {

        var $ = cheerio.load(body);

        $('.feed-item.vevent.tip-list-row').each(function( index ) {
        var predictionThreeWay = $(this).children().next().children().next().next().next().children().first().text().trim();
        var puntersName = $(this).children().last().text().trim().toString().split('\n\n\n').pop().trim();
        var awayTeamSplit = $(this).children().next().children().next().next().children().next().text().trim().toString().split('\n\n').shift().trim();
        var awayTeam = awayTeamSplit.split(' vs ').pop().trim();
        var homeTeam = $(this).children().next().children().next().next().children().next().text().trim().toString().split(' vs ').shift().trim();
        var matchTime = $(this).children().first().text().trim();
        var drawOdds = $(this).children().next().children().next().next().next().first().attr('title');
        //var awayOdds = $(this).parent().parent().parent().next().next().next().text().trim();
        //var updateDate = new Date().toString();
        //var matchID = homeTeam.substring(0, 3) + awayTeam.substring(0, 3);
      
        odds = {
          predictionThreeWay: predictionThreeWay,
          puntersName: puntersName,
          matchTime: matchTime,
          homeTeam: homeTeam,
          awayTeam: awayTeam,
          drawOdds: drawOdds
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
