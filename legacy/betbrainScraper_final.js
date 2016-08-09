var request = require('request');
var cheerio = require('cheerio');

var existingMatches = [];
var newMatches = [];
var action = "";

function callback(error, response, body) {
 	 //console.log(response);
 		 if (!error && response.statusCode == 200) {
   		 console.log("successfully " + action);
   		} else {
   			console.log("failed " + error);
   		}
   	};
/*
//This fills the IDs variable with existing IDs so we can check what is existent already
request('http://localhost:2403/matches', function(error, response, body) {
  var data = JSON.parse(body);
  
  for(var i = 0; i < data.length; i++) {
   existingMatches.push({"providerID": data[i].matchID, "nativeID": data[i].id})
    };
    console.log(existingMatches);
});
*/

//IMPORTANT ->>> THIS WORKS:
  var awayTeam = "";
  var homeTeam = "";
  var awayTeamName = [];
  var urlsToScrape = [];
  var odds = "";

  var url = "https://www.betbrain.de/next-matches/football/?expandAll=true";

  request(url, {jar: true}, function(error, response, body) {
    if(error) {
      console.log("Error: " + error);
    }
    console.log("Status code: " + response.statusCode);
    //console.log(body);

    var $ = cheerio.load(body);
  
    $('.MDLink.MatchLink.MDxMatchLink').each(function( index ) {
      //var title = $(this).find('.of_wrapper').text().trim();
      var upcomingGameLink = $(this).attr('href');
      urlsToScrape.push(upcomingGameLink);
      });
      
      console.log(urlsToScrape);

    for(var x = 0; x < urlsToScrape.length; x++) {
      url = 'https://www.betbrain.de' + urlsToScrape[x] + '1x2/full-time-excluding-overtime/?only=true';

        request(url, {jar: true}, function(error, response, body) {

        var $ = cheerio.load(body);

        $('.BM.OTBookie').each(function( index ) {
        var bookmaker = $(this).text().trim();
        var homeOdds = $(this).parent().parent().parent().next().text().trim();
        var awayTeam = $('.OTBookieLink').attr('href').slice(0, -34).toString().split('-v-').pop().split("-").join(" ").split("  w").join("").trim();
        var homeTeamString = $('.OTBookieLink').attr('href').slice(0, -34).toString();
        var homeTeam = homeTeamString.substring(homeTeamString.lastIndexOf("-v-"), homeTeamString.lastIndexOf("/")+1).split("-").join(" ");
        var drawOdds = $(this).parent().parent().parent().next().next().text().trim();
        var awayOdds = $(this).parent().parent().parent().next().next().next().text().trim();
        var updateDate = new Date().toString();
        var matchID = homeTeam.substring(0, 3) + awayTeam.substring(0, 3);
      
        odds = {
          bookmaker: bookmaker,
          homeOdds: homeOdds,
          drawOdds: drawOdds,
          awayOdds: awayOdds,
          awayTeam: awayTeam,
          homeTeam: homeTeam,
          matchID: matchID,
          siteProvider: 'betbrain',
          createdDate: new Date()
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
    };

});