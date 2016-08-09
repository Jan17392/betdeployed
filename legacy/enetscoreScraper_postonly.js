//var enetscoreRun = function(){


var request = require('request');
var cheerio = require('cheerio');


var action = "";

var options = {
          method: "",
          url: "",
          headers: jsonHeader,
          form: ""        
          };

var action = "";
var jsonHeader = {'Content-Type': 'application/json'};
var searchId = [];
var idToPush = [];

function callback(error, response, body) {
 		 if (!error && response.statusCode == 200) {
   		 console.log("successfully " + action);
   		} else {
   			console.log("failed " + error);
   		}
   	};



request('http://localhost:2403/matches/', function(error, response, body) {
  var data = JSON.parse(body);
  for(var i = 0; i < data.length; i++) {
   searchId.push(data[i].matchID)
   idToPush.push(data[i].id)
    };
    console.log(searchId);
    console.log(idToPush);


for(var i = 0; i < 5; i++) {
  var url = "http://sportingbet.enetscores.com/livescore/soccer/d" + [i];

  request(url, {jar: true}, function(error, response, body) {
    if(error) {
      console.log("Error: " + error);
    }
    console.log("Status code: " + response.statusCode);

    var $ = cheerio.load(body);
  
    $('.default .status').each(function( index ) {
      var status = $(this).children().eq(2).text().trim();
      var date = $(this).children().eq(1).text().trim();
      var homeTeam = $(this).next().children().text().trim();
      var awayTeam = $(this).next().next().next().children().text().trim();
      var homeGoals = $(this).next().next().children().eq(0).text().trim();
      var awayGoals = $(this).next().next().children().eq(1).text().trim();
      var matchID = homeTeam.substring(0, 3) + awayTeam.substring(0, 3) + date.substring(0, 5).replace("/", "-");
      
      console.log(date + ", " + status + ", " + homeTeam + ", " + awayTeam + ", " + homeGoals + ", " + awayGoals + ", " + matchID);

        matchData = {
          homeTeamName: homeTeam,
          awayTeamName: awayTeam,
          homeScore: homeGoals,
          awayScore: awayGoals,
          matchStatus: status,
          matchDate: date,
          createdDate: new Date(),
          matchID: matchID
        }



          if(searchId.indexOf(matchID) !== -1){
            console.log(searchId.indexOf(matchID));

            matchData = {
            homeTeamName: homeTeam,
            awayTeamName: awayTeam,
            homeScore: homeGoals,
            awayScore: awayGoals,
            matchStatus: status,
            updateDate: new Date(),
            matchEvents: {"homeScore": homeGoals, "awayScore": awayGoals, "dateDate": new Date(), "matchStatus": status}
            }

          action = "updated";

          var options = {
          method: 'PUT',
          url: 'http://localhost:2403/matches/?id=' + idToPush[searchId.indexOf(matchID)],
          form: matchData       
          }

          request(options, callback);

        } else {
          console.log("not found");
          console.log(searchId.indexOf(matchID));
          //console.log(searchId);

          action = "created";

          var options = {
          method: 'POST',
          url: 'http://localhost:2403/matches',
          form: matchData       
          }
          request(options, callback);
        }
                    
    })
  })
}

})

//exports.enetscoreRun = enetscoreRun;

