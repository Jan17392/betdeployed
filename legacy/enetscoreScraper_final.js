var request = require('request');
var cheerio = require('cheerio');
var fs = require('fs');

var matchData = [];

var options = {
          method: "",
          url: "",
          headers: jsonHeader,
          form: ""        
          };

var action;
var jsonHeader = {'Content-Type': 'application/json'};

function callback(error, response, body) {
 		 if (!error && response.statusCode == 200) {
   		 console.log(action);
   		} else {
   			console.log("failed " + error);
   		}
   	};


for(var i = 0; i < 2; i++) {
  var url = "http://sportingbet.enetscores.com/livescore/soccer/d" + [i];

  request(url, {jar: true}, function(error, response, body) {
    if(error) {
      console.log("Error: " + error);
    }
    console.log("Status code: " + response.statusCode);

    var $ = cheerio.load(body);
  
    $('.default .status').each(function( index ) {
      //var status = $(this).children().eq(2).text().trim();
      //var date = $(this).children().eq(1).text().trim();
      //var homeTeam = $(this).next().children().text().trim();
      //var awayTeam = $(this).next().next().next().children().text().trim();
      //var homeGoals = $(this).next().next().children().eq(0).text().trim();
      //var awayGoals = $(this).next().next().children().eq(1).text().trim();
      //var updateDate = new Date();
      //var matchID = homeTeam.substring(0, 3) + awayTeam.substring(0, 3) + date.substring(0, 5);

      //console.log(date + ", " + status + ", " + homeTeam + ", " + awayTeam + ", " + homeGoals + ", " + awayGoals + ", " + updateDate + ", " + matchID);

      matchData.push({
        homeTeamName: $(this).next().children().text().trim(),
        awayTeamName: $(this).next().next().next().children().text().trim(),
        homeScore: $(this).next().next().children().eq(0).text().trim(),
        awayScore: $(this).next().next().children().eq(1).text().trim(),
        matchStatus: $(this).children().eq(2).text().trim(),
        matchDate: $(this).children().eq(1).text().trim(),
        updateDate: new Date(),
        matchID: $(this).next().children().text().trim().substring(0, 3) + $(this).next().next().next().children().text().trim().substring(0, 3) + $(this).children().eq(1).text().trim().substring(0, 5),
      });

          });
      console.log(matchData);
      console.log(matchData.length);
      

      for(var i = 0; i < matchData.length; i++) {
      request(('http://localhost:2403/matches?matchID=' + matchData[i].matchID), function(error, response, body) {
        

        if(response.body !== "[]" && response.statusCode == 200) {
          var data = JSON.parse(body);
          console.log("successfully found " + matchData[i].matchID);
          action = "successfully updated Record"
          var options = {
          method: 'PUT',
          url: 'http://localhost:2403/matches/' + data[0].id,
          form: matchData[i]        
          };

          request(options, callback);
            
          } else if(!error) {
          console.log(response.statusCode);
          console.log("no record for this game was found");
          console.log(matchData[i]);
          action = "Record successfully created"
          var options = {
          method: 'POST',
          url: 'http://localhost:2403/matches',
          form: matchData[i]        
          };

          request(options, callback);
        }
      });
    }

      
      //console.log(matchData.length);
        //console.log(matchData);


    })
  };


      

