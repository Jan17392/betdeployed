var request = require('request');
var cheerio = require('cheerio');
var moment = require('moment');

var urlsToScrape = [];
var odds = "";
var url = 'http://www.coolstuff.de/category/Alles';



function callback(error, response, body) {
 	 //console.log(response);
 		 if (!error && response.statusCode == 200) {
   		 console.log("successfully created");
   		} else {
   			console.log("failed " + error);
   		}
   	};


    
request(url, {jar: true}, function(error, response, body) {

        var $ = cheerio.load(body);

        $('.productTitle').each(function( index ) {
        var urlResult = $(this).children().attr("href").trim();

        urlsToScrape.push(urlResult);
    

 })

    console.log(urlsToScrape)


  for(var x = 0; x < urlsToScrape.length; x++) {
      url = 'https://www.coolstuff.de' + urlsToScrape[x];
      console.log(url);
      console.log("xxxxx")
    

        request(url, {jar: true}, function(error, response, body) {

        var urltopost = url;    
        var $ = cheerio.load(body);
        

        $('.ratingpoint').each(function( index ) {
        var starRating = $(this).text().trim();
        var numberOfReviews = $(this).parent().parent().next().text().toString().split(" Bewertung").shift().trim();
        var urltopost = $(this).parent().parent().prev().text().trim();
        //var reviews = $(this).next().children().next().text().trim();
        var description = $(this).parent().parent().prev().text().trim();
        var price = $(this).parent().parent().text().toString().split("\n\t\t\t\t\n\t\t\t\n\n\t\t\t\n\t\t\t\t\n\t\t\t\t\t").pop().trim();

      
        odds = {
          starRating: starRating,
          urls: urltopost,
          numberOfReviews: numberOfReviews,
          price: price

          };

          var options = {
            method: 'POST',
            url: 'https://hooks.zapier.com/hooks/catch/528457/4aezih/',
            headers: {'Content-Type': 'application/json'},
            form: odds       
         };

      request(options, callback);
      
        console.log(odds);

        });
    })
    }


})
