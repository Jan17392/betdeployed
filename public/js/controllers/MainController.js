app.controller('MainController', function($scope, $http) {

  $scope.todos = 0;
  //$scope.matcheslength = 0;

  var query = JSON.stringify({"bettingChoice":{$exists: true}, "kellyPercentageHome":{$exists: true}, "kellyPercentageHome":{$gt: 0.00}, "matchDate": {$gte: moment().format('DD/MM')}});

  // Get all todos
  $http.get('http://localhost:2403/matches/?' + query)
  .success(function(todos) {
      $scope.loaded = true;
      $scope.todos = todos;
      $scope.todoslength = todos.length;
      $scope.homeTeamNames = todos;
    }).error(function(err) {
      alert(err);
    });


  $scope.bets = 0;
  //$scope.matcheslength = 0;

  //var query = JSON.stringify({"bettingChoice":{$exists: true}, "kellyPercentageHome":{$exists: true}, "matchDate": {$gte: moment().format('DD/MM')}});

  // Get all todos
  $http.get('http://localhost:2403/userbetlines/')
  .success(function(bets) {
      $scope.loaded = true;
      $scope.bets = bets;
      $scope.betslength = bets.length;
      $scope.homeTeamNames = bets;
    }).error(function(err) {
      alert(err);
    });

});




