var request = require("request");
var cheerio = require("cheerio");

var urlsToScrape = [100, 200, 300, 400]


for (var i = 1; i <= 5; i++) {
    setTimeout(function(x) { return function() { console.log(x); }; }(i), 1000*i);

      console.log("This is the URL to Scrape before Timeout: " + urlsToScrape[i])
      setTimeout(function scrapeAndCreate (urlsToScrape, x) {
      var urlHandOver = urlsToScrape[i];
      console.log("This is the URL to Scrape after the Timeout: " + urlHandOver);
      url = 'https://www.betbrain.de' + urlHandOver + '1x2/full-time-excluding-overtime/?only=true';

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
      }, (x+x+1) * 1000);
}