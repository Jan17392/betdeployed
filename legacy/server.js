var querystring = require('querystring');
var every = require('schedule').every;

//var soccerTeams = new Array('Bayern Munich', 'Borussia Dortmund', '1. FC Cologne');
var soccerteams = {};

function PerformRequest(secure, host, endpoint, port, method, data, success) {
  if (secure) {
    var http = require('https');
  }
  else
  {
    var http = require('http');
  }

  var dataString = JSON.stringify(data);
  var headers = {};
  
  if (method == 'GET' && data) {
    endpoint += '?' + querystring.stringify(data);
  }
  else {
    headers = {
      'Content-Type': 'application/json',
      'Content-Length': dataString.length,
      'X-Auth-Token': '87d59872fb0144299a0e5cb252e436a9'
      };
  }

console.log(dataString);

  var options = {
    host: host,
    path: endpoint,
    method: method,
    headers: headers,
    port: port
  };

  var req = http.request(options, function(res) {
    //res.setEncoding('utf-8');

    var responseString = '';

    res.on('data', function(data) {
      responseString += data;
    });

    res.on('end', function() {
      console.log(responseString);
      var responseObject = JSON.parse(responseString);
      success(responseObject);
    });
  });

  if (data) {req.write(dataString)}
  req.end();
}

function GetSoccerteams()
{
  console.log("Getting the names of the soccerteams");
  PerformRequest(false, 'localhost', '/soccerteams', '2403', 'GET', null, function(response){
    console.log(response);
    soccerteams = response;
    for (i = 0; i < soccerteams.length; i++){
      GetSoccerteam(soccerteams[i]["name"]);
    }
  });
}

function GetSoccerteam(name)
{
	PerformRequest(false, 'api.football-data.org', '/v1/teams/' + name, 80, 'GET', {}, function(data){
		console.log(data);
    if (data["squadMarketValue"] && data["name"]) {
      var squadMarketValue = data["squadMarketValue"] ? data["squadMarketValue"] : "empty";
      var name = data["name"] ? data["name"] : "empty";
      console.log(squadMarketValue + name);
    }
    else {
      console.log(name + squadMarketValue);
    };

    time = new Date();

		myData = {
			name: name,
			squadMarketValue: squadMarketValue,
      time: time
		};

		console.log(myData);
		PerformRequest(false, 'localhost', '/soccerteams', '2403', 'POST', myData, function(response){
			console.log(response);
		});
	});
}



//every('5m').do(function() {
  GetSoccerteams();
//});
