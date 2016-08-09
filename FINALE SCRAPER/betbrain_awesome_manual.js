//var betbrainRun = function(){

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

  var awayTeam = "";
  var homeTeam = "";
  var awayTeamName = [];
  var urlsToScrape = [];
  var continueCode;
  var odds = "";
  var code = [];

  var url = "https://www.betbrain.de/next-matches/football/";

  request(url, {jar: true}, function(error, response, body) {
    if(error) {
      console.log("Error: " + error);
    }
    console.log("Status code: " + response.statusCode);

    var $ = cheerio.load(body);
  
    $('.MDLink.MatchLink.MDxMatchLink').each(function( index ) {
      //var title = $(this).find('.of_wrapper').text().trim();
      var upcomingGameLink = $(this).attr('href');
      var continueCode = $('.MatchDetails').prev().text().split('lastEventId = ').pop().split(';').shift();
      urlsToScrape.push(upcomingGameLink);
      code.push(continueCode);
      });
      
      console.log(urlsToScrape);
      console.log(code);

  var url = "https://www.betbrain.de/next-matches/football/?evId=" + code.pop();
  console.log("https://www.betbrain.de/next-matches/football/?evId=" + code.pop());
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
      var continueCode = $('.MatchDetails').prev().text().split('lastEventId = ').pop().split(';').shift();
      urlsToScrape.push(upcomingGameLink);
      code.push(continueCode);
      });
      
      console.log(urlsToScrape);
      console.log(code);

var url = "https://www.betbrain.de/next-matches/football/?evId=" + code.pop();
  console.log("https://www.betbrain.de/next-matches/football/?evId=" + code.pop());
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
      var continueCode = $('.MatchDetails').prev().text().split('lastEventId = ').pop().split(';').shift();
      urlsToScrape.push(upcomingGameLink);
      code.push(continueCode);
      });
      
      console.log(urlsToScrape);
      console.log(code);

var url = "https://www.betbrain.de/next-matches/football/?evId=" + code.pop();
  console.log("https://www.betbrain.de/next-matches/football/?evId=" + code.pop());
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
      var continueCode = $('.MatchDetails').prev().text().split('lastEventId = ').pop().split(';').shift();
      urlsToScrape.push(upcomingGameLink);
      code.push(continueCode);
      });
      
      console.log(urlsToScrape);
      console.log(code);

var url = "https://www.betbrain.de/next-matches/football/?evId=" + code.pop();
  console.log("https://www.betbrain.de/next-matches/football/?evId=" + code.pop());
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
      var continueCode = $('.MatchDetails').prev().text().split('lastEventId = ').pop().split(';').shift();
      urlsToScrape.push(upcomingGameLink);
      code.push(continueCode);
      });
      
      console.log(urlsToScrape);
      console.log(code);

var url = "https://www.betbrain.de/next-matches/football/?evId=" + code.pop();
  console.log("https://www.betbrain.de/next-matches/football/?evId=" + code.pop());
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
      var continueCode = $('.MatchDetails').prev().text().split('lastEventId = ').pop().split(';').shift();
      urlsToScrape.push(upcomingGameLink);
      code.push(continueCode);
      });
      
      console.log(urlsToScrape);
      console.log(code);

var url = "https://www.betbrain.de/next-matches/football/?evId=" + code.pop();
  console.log("https://www.betbrain.de/next-matches/football/?evId=" + code.pop());
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
      var continueCode = $('.MatchDetails').prev().text().split('lastEventId = ').pop().split(';').shift();
      urlsToScrape.push(upcomingGameLink);
      code.push(continueCode);
      });
      
      console.log(urlsToScrape);
      console.log(code);

var url = "https://www.betbrain.de/next-matches/football/?evId=" + code.pop();
  console.log("https://www.betbrain.de/next-matches/football/?evId=" + code.pop());
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
      var continueCode = $('.MatchDetails').prev().text().split('lastEventId = ').pop().split(';').shift();
      urlsToScrape.push(upcomingGameLink);
      code.push(continueCode);
      });
      
      console.log(urlsToScrape);
      console.log(code);

var url = "https://www.betbrain.de/next-matches/football/?evId=" + code.pop();
  console.log("https://www.betbrain.de/next-matches/football/?evId=" + code.pop());
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
      var continueCode = $('.MatchDetails').prev().text().split('lastEventId = ').pop().split(';').shift();
      urlsToScrape.push(upcomingGameLink);
      code.push(continueCode);
      });
      
      console.log(urlsToScrape);
      console.log(code);

var url = "https://www.betbrain.de/next-matches/football/?evId=" + code.pop();
  console.log("https://www.betbrain.de/next-matches/football/?evId=" + code.pop());
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
      var continueCode = $('.MatchDetails').prev().text().split('lastEventId = ').pop().split(';').shift();
      urlsToScrape.push(upcomingGameLink);
      code.push(continueCode);
      });
      
      console.log(urlsToScrape);
      console.log(code);

var url = "https://www.betbrain.de/next-matches/football/?evId=" + code.pop();
  console.log("https://www.betbrain.de/next-matches/football/?evId=" + code.pop());
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
      var continueCode = $('.MatchDetails').prev().text().split('lastEventId = ').pop().split(';').shift();
      urlsToScrape.push(upcomingGameLink);
      code.push(continueCode);
      });
      
      console.log(urlsToScrape);
      console.log(code);

  var url = "https://www.betbrain.de/next-matches/football/?evId=" + code.pop();
  console.log("https://www.betbrain.de/next-matches/football/?evId=" + code.pop());
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
      var continueCode = $('.MatchDetails').prev().text().split('lastEventId = ').pop().split(';').shift();
      urlsToScrape.push(upcomingGameLink);
      code.push(continueCode);
      });
      
      console.log(urlsToScrape);
      console.log(code);

    for(var x = 0; x < urlsToScrape.length; x++) {
      url = 'https://www.betbrain.de' + urlsToScrape[x] + '1x2/full-time-excluding-overtime/?only=true';

        request(url, {jar: true}, function(error, response, body) {

          if(body){

        var $ = cheerio.load(body);

        $('.BM.OTBookie').each(function( index ) {
        var bookmaker = $(this).text().trim();
        var homeOdds = $(this).parent().parent().parent().next().text().trim();
        var awayTeam = $('.OTBookieLink').attr('href').slice(0, -34).toString().split('-v-').pop().split("-").join(" ").split("  w").join("").trim();
        var homeTeamString = $('.OTBookieLink').attr('href').slice(0, -34).toString();
        var homeTeam = homeTeamString.substring(homeTeamString.lastIndexOf("-v-"), homeTeamString.lastIndexOf("/")+1).split("-").join(" ");
        var drawOdds = $(this).parent().parent().parent().next().next().text().trim();
        var awayOdds = $(this).parent().parent().parent().next().next().next().text().trim();
        var matchID = homeTeam.substring(0, 3) + awayTeam.substring(0, 3);
        //var matchDate = $('span.MMCLText.DateTime').prop('startDate');
      
        odds = {
          bookmaker: bookmaker,
          homeOdds: parseFloat(homeOdds.replace(',','.').replace(' ','')),
          drawOdds: parseFloat(drawOdds.replace(',','.').replace(' ','')),
          awayOdds: parseFloat(awayOdds.replace(',','.').replace(' ','')),
          awayTeam: awayTeam,
          homeTeam: homeTeam,
          //matchId: matchID,
          siteProvider: 'betbrain',
          createdDate: new Date(),
          //matchDate: matchDate
          };

          var options = {
            method: 'POST',
            url: 'http://localhost:2403/odds/',
            headers: {'Content-Type': 'application/json'},
            form: odds       
         };

      request(options, callback);
      
        console.log(odds);

        });
      } else {
        console.log("empty html....")
      }
        });
      }
    });

})
})
})
})
})
})
})
})
})
})
})


//}
//exports.betbrainRun = betbrainRun;