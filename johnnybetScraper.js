//var zulubetRun = function(){


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
      url = 'https://www.johnnybet.com/app/picks#stats?utf8=%E2%9C%93&cf%5Bsport%5D=Football&cf%5Bpick_type%5D=0&cf%5Bday_tip%5D=1&cf%5Bsort_by%5D=last_pick_finished_at&cf%5Border%5D=desc&cf%5Bper%5D=2500&cf%5Bpage%5D=1&cf%5Bgraph_id%5D=graph-cont-2';
      console.log(url);
    

        request(url, {jar: true}, function(error, response, body) {

        var $ = cheerio.load(body);

        $('.header').each(function( index ) {
        var homeProbability = $(this).attr('href');
        var drawProbability = $(this).parent().next().next().next().children().next().text().trim().split('by').shift();
        if(drawProbability == '1X2'){
          console.log('good')
        } else {
          console.log('bad')
        }
        //var awayProbability = $(this).prev().prev().prev().text().trim();
        //var awayTeam = $(this).prev().prev().prev().prev().prev().prev().prev().text().trim().toString().split('-').pop().trim();
        //var homeTeam = $(this).prev().prev().prev().prev().prev().prev().prev().text().trim().toString().split('-').shift().trim();
        //var matchTime = $(this).prev().prev().prev().prev().prev().prev().prev().prev().text().trim().toString().split(';').pop();
        //var drawOdds = $(this).parent().parent().parent().next().next().text().trim();
        //var awayOdds = $(this).parent().parent().parent().next().next().next().text().trim();
        //var updateDate = new Date().toString();
        //var matchID = homeTeam.substring(0, 3) + awayTeam.substring(0, 3) + matchTime.substring(0, 5);
      
        odds = {
          homeProbability: homeProbability,
          drawProbability: drawProbability,
          //awayProbability: parseInt(awayProbability),
          createdDate: new Date(),
          //homeTeam: homeTeam,
          //awayTeam: awayTeam,
          expertId: 'johnnybet',
          bettingType: '1X2',
          //matchId: matchID,
          //matchDate: matchTime
          };

          var options = {
            method: 'POST',
            url: 'http://localhost:2403/expertpredictions/',
            headers: {'Content-Type': 'application/json'},
            form: odds       
         };

      //request(options, callback);
      
        console.log(odds);

        });
    });

}
//}

//exports.zulubetRun = zulubetRun;
