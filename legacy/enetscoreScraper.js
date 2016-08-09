var request = require('request');
var cheerio = require('cheerio');
var fs = require('fs');

var json = {
  homeTeamName: "",
  awayTeamName: "",
  matchID: "",
  homeScore: "",
  awayScore: "",
  matchStatus: "",
  matchMinute: "",
  date: "",
  updateDate: ""
};

var options = {
  method: 'GET',
  url: 'http://localhost:2403/matches',
  headers: {'Content-Type': 'application/json'},
    form: {}
};

var existingMatches = [];
var newMatches = [];

for(var i = 0; i < 2; i++) {
  var url = "http://sportingbet.enetscores.com/livescore/soccer/d" + [i];

  request(url, {jar: true}, function(error, response, body) {
    if(error) {
      console.log("Error: " + error);
    }
    console.log("Status code: " + response.statusCode);
    //console.log(body);

    var $ = cheerio.load(body);
  
    $('.default .status').each(function( index ) {
      //var title = $(this).find('.of_wrapper').text().trim();
      var status = $(this).children().eq(2).text().trim();
      var date = $(this).children().eq(1).text().trim();
      var homeTeam = $(this).next().children().text().trim();
      var awayTeam = $(this).next().next().next().children().text().trim();
      var homeGoals = $(this).next().next().children().eq(0).text().trim();
      var awayGoals = $(this).next().next().children().eq(1).text().trim();
      var updateDate = new Date();
      var matchID = homeTeam.substring(0, 3) + awayTeam.substring(0, 3) + date.substring(0, 5);

      console.log(date + ", " + status + ", " + homeTeam + ", " + awayTeam + ", " + homeGoals + ", " + awayGoals + ", " + updateDate + ", " + matchID);
      //fs.appendFileSync('betbrain.txt', title + '\n');

      json = {
        homeTeamName: homeTeam,
        awayTeamName: awayTeam,
        homeScore: homeGoals,
        awayScore: awayGoals,
        matchStatus: status,
        matchID: matchID,
        date: date,
        updateDate: updateDate
      };

      console.log(json);

  });
})
};