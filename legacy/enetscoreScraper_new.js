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

//This fills the IDs variable with existing IDs so we can check what is existent already
request('http://localhost:2403/matches', function(error, response, body) {
  var data = JSON.parse(body);
  
  for(var i = 0; i < data.length; i++) {
   existingMatches.push({"providerID": data[i].matchID, "nativeID": data[i].id})
    };
    console.log(existingMatches);
});



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

      json = {
        homeTeamName: homeTeam,
        awayTeamName: awayTeam,
        homeScore: homeGoals,
        awayScore: awayGoals,
        matchStatus: status,
        matchID: matchID,
        matchDate: date,
        updateDate: updateDate
      };

      console.log(json);

      

      if(existingMatches.includes({providerID: matchID}) !== -1) {
      	console.log(existingMatches.includes(matchID));
      	console.log(existingMatches.includes({providerID: matchID}));

      	action = "created";

      	var options = {
    	method: 'POST',
    	url: 'https://hooks.zapier.com/hooks/catch/528457/41f99f/',
    	headers: {'Content-Type': 'application/json'},
    	form:
    		{
    		homeTeamName: homeTeam,
        	awayTeamName: awayTeam,
        	homeScore: homeGoals,
        	awayScore: awayGoals,
        	matchStatus: status,
        	matchID: matchID,
        	matchDate: date,
        	createdDate: updateDate
    		}
    	};

    	request(options, callback);

      } else {

      		
      		action = "updated";
      	

      options = {
      		method: 'PUT',
      		url: 'http://localhost:2403/matches/' + putMatchId,
      		headers: {'Content-Type': 'application/json'},
      		form:
        		{
        		Odds1: "1",
        		OddsX: "2"
        		}
      	};

      		request(options, callback);
  	};



  });
})
};