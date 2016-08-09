//var betsplacedRun = function(){

var request = require("request");
var moment = require("moment");


var IDs = [];
var budget = "";
var changeInBudget = "";
var BetlineIDs = [];

//This function initiates the callback and prints the success in case everything went well. It will be called by the PUT to db action
function callback(error, response, body) {
  if (!error && response.statusCode == 200) {
    console.log("successfully added new odds");
  }
};

request('http://localhost:2403/userbetlines/', function(error, response, body) {
  var dataBets = JSON.parse(body);
  for(var x = 0; x < dataBets.length; x++) {
  	IDs.push(dataBets[x].matchReference);
    BetlineIDs.push(dataBets[x].id);
  }
  	console.log(IDs);

    request('http://localhost:2403/users/?id=946e033aef5199a8', function(error, response, body) {
      var dataUsers = JSON.parse(body);
      budget = dataUsers.budget;
      console.log(budget);

  	var query = JSON.stringify({"bettingChoice":{$exists: true}, "kellyPercentageHome":{$gt: 0}, "kellyPercentageDraw":{$gt: 0}, "kellyPercentageAway":{$gt: 0}});

    request('http://localhost:2403/matches/?' + query, function(error, response, body) {
  	var dataMatches = JSON.parse(body);
    budget = dataUsers.budget;
    console.log(budget);
  	

  	for(var i = 0; i < dataMatches.length; i++) {
  		var IDindex = IDs.indexOf(dataMatches[i].id);
      console.log(IDindex + dataMatches[i].matchStatus)
      var matchStatus = dataMatches[i].matchStatus;
      var kellyAllocated = "";
      var oddsAllocated = "";
      var providerAllocated = "";
      var bettingStatus = "";
      var changeInBudget = "";
      var correctPrediction = "";
      var budgetAllocated = "";
      var bettingType = "1X2";

      console.log("Your current budget is: " + budget + " EUR");






      //NEW BETLINE ENTRY - Create new Betline if the Status is Open and no such entry exists yet
  		if(IDindex == -1 && matchStatus == "Not started"){

        bettingStatus = "Open";

  			if(dataMatches[i].bettingChoice == 1){
  				var kellyAllocated = dataMatches[i].kellyPercentageHome;
  				var oddsAllocated = dataMatches[i].maxOddHome;
  				var providerAllocated = "";
  			} else if(dataMatches[i].bettingChoice == "X"){
          var kellyAllocated = dataMatches[i].kellyPercentageDraw;
          var oddsAllocated = dataMatches[i].maxOddDraw;
          var providerAllocated = "";
        } else if(dataMatches[i].bettingChoice == 2){
          var kellyAllocated = dataMatches[i].kellyPercentageAway;
          var oddsAllocated = dataMatches[i].maxOddAway;
          var providerAllocated = "";
        }

        budgetAllocated = budget * kellyAllocated;
        budget -= budgetAllocated;
        console.log(budget + " EUR is left in your Account");
          
        var newBettingLine = {
          userId: "946e033aef5199a8",
          matchReference: dataMatches[i].id,
          bettingChoice: dataMatches[i].bettingChoice,
          changeInBudget: changeInBudget,
          correctPrediction: correctPrediction,
          budgetAllocated: budgetAllocated,
          budgetAvailable: budget,
          bettingStatus: bettingStatus,
          kellyAllocated: kellyAllocated,
          oddAllocated: oddsAllocated,
          providerAllocated: providerAllocated,
          bettingType: bettingType,
          createdDate: new Date()
          };

        var options = {
            method: 'POST',
            url: 'http://localhost:2403/userbetlines/',
            headers: {'Content-Type': 'application/json'},
            form: newBettingLine       
         };

        console.log(newBettingLine);
        request(options, callback);

    }
      //NEW BETLINE ENTRY - END


    if(IDindex != -1 && matchStatus != "Not started"){
  		if(matchStatus == "Finished" && dataBets[IDindex].changeInBudget == 0 || matchStatus == "Finished" && dataBets[IDindex].changeInBudget == null){
  				var bettingStatus = "Finished";

  				if(dataMatches[i].homeScore == dataMatches[i].awayScore && dataMatches[i].bettingChoice == "X"){
            changeInBudget = dataBets[IDindex].budgetAllocated * dataBets[IDindex].oddAllocated;
            budget += changeInBudget;
            console.log("correct prediction")
            var correctPrediction = "true";
            console.log(budget)
  				} else if(dataMatches[i].homeScore < dataMatches[i].awayScore && dataMatches[i].bettingChoice == "2"){
            changeInBudget = dataBets[IDindex].budgetAllocated * dataBets[IDindex].oddAllocated;
            budget += changeInBudget;
            console.log("correct prediction")
            var correctPrediction = "true";
            console.log(budget)
          } else if(dataMatches[i].homeScore > dataMatches[i].awayScore && dataMatches[i].bettingChoice == "1"){
            changeInBudget = dataBets[IDindex].budgetAllocated * dataBets[IDindex].oddAllocated;
            budget += changeInBudget;
            console.log("correct prediction")
            var correctPrediction = "true";
            console.log(budget)
          } else{
            console.log("wrong prediction");
            changeInBudget = dataBets[IDindex].budgetAllocated * (-1)
            var correctPrediction = "false";
          }


          var updatedBettingLine = {
          userId: "946e033aef5199a8",
          //matchReference: dataMatches[i].id,
          //bettingChoice: dataMatches[i].bettingChoice,
          changeInBudget: changeInBudget,
          correctPrediction: correctPrediction,
          //budgetAllocated: budgetAllocated,
          bettingStatus: bettingStatus,
          //kellyAllocated: kellyAllocated,
          //oddAllocated: oddsAllocated,
          //providerAllocated: providerAllocated,
          updatedDate: new Date()
          };

          var options = {
            method: 'PUT',
            url: 'http://localhost:2403/userbetlines/?id=' + BetlineIDs[IDindex],
            headers: {'Content-Type': 'application/json'},
            form: updatedBettingLine       
         };

    console.log(updatedBettingLine);
    request(options, callback);

  			} else if((matchStatus == "Cancelled" && dataBets[IDindex].changeInBudget == null) || (matchStatus == "Finished AP" && dataBets[IDindex].changeInBudget == null)) {
  				var bettingStatus = "Disqualified";
          changeInBudget = dataBets[IDindex].budgetAllocated;
          budget += dataBets[IDindex].budgetAllocated;
  				var correctPrediction = "n/a";

          var updatedBettingLine = {
          userId: "946e033aef5199a8",
          //matchReference: dataMatches[i].id,
          //bettingChoice: dataMatches[i].bettingChoice,
          changeInBudget: changeInBudget,
          correctPrediction: correctPrediction,
          //budgetAllocated: budgetAllocated,
          bettingStatus: bettingStatus,
          //kellyAllocated: kellyAllocated,
          //oddAllocated: oddsAllocated,
          //providerAllocated: providerAllocated,
          updatedDate: new Date()
          };

          var options = {
            method: 'PUT',
            url: 'http://localhost:2403/userbetlines/?id=' + BetlineIDs[IDindex],
            headers: {'Content-Type': 'application/json'},
            form: updatedBettingLine       
         };

    console.log(updatedBettingLine);
    request(options, callback);
  			}

  		
    console.log(BetlineIDs[IDindex])

    console.log(budget)

    var updateBudget = {
      budget: budget
    }

    var options = {
            method: 'PUT',
            url: 'http://localhost:2403/users/?id=946e033aef5199a8',
            headers: {'Content-Type': 'application/json'},
            form: updateBudget       
         };
    console.log(budget)
    request(options, callback);

  }
  
}

var currentBudget = {
      budget: budget
    }

    var options = {
            method: 'PUT',
            url: 'http://localhost:2403/users/?id=946e033aef5199a8',
            headers: {'Content-Type': 'application/json'},
            form: currentBudget       
         };
    console.log(budget)
    request(options, callback);

})
})
})

//}
//exports.betsplacedRun = betsplacedRun;