var request = require('request');
var cheerio = require('cheerio');
var fs = require('fs');

request("https://www.betbrain.de/next-matches/football/", {jar: true}, function(error, response, body) {
  if(error) {
    console.log("Error: " + error);
  }
  console.log("Status code: " + response.statusCode);
  console.log(body);

  var $ = cheerio.load(body);

  $('#e_1695472').each(function( index ) {
    var title = $(this).find('.td[5]/div').text().trim();
    //var score = $(this).find('div.score.unvoted').text().trim();
   // var user = $(this).find('a.author').text().trim();
    console.log("Title: " + title);
    //console.log("Score: " + score);
    //console.log("User: " + user);
    fs.appendFileSync('betbrain.txt', title + '\n' + score + '\n' + user + '\n');
    fs.appendFileSync('betbrainhtml.txt', body + '\n');
  });

});