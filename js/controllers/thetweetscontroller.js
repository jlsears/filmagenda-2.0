  app.controller('TheTweetsCtrl', function ($rootScope, $scope, $location) {
    $scope.message = "Where the curated tweets live!"

    twttr.widgets.load();

  });