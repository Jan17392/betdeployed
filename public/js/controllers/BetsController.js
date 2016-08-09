app.controller('BetsController', function($scope, $http) {

  $scope.bets = 0;
  //$scope.matcheslength = 0;

  //var query = JSON.stringify({"bettingChoice":{$exists: true}, "kellyPercentageHome":{$exists: true}, "matchDate": {$gte: moment().format('DD/MM')}});

  // Get all todos
  $http.get('http://localhost:2403/dashboard/userbetlines/')
  .success(function(bets) {
      $scope.loaded = true;
      $scope.bets = bets;
      $scope.betslength = bets.length;
      $scope.homeTeamNames = bets;
    }).error(function(err) {
      alert(err);
    });

});