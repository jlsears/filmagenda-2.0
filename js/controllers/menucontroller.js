  app.controller('MenuCtrl', ['$scope', '$location', 'Auth', function ($scope, $location, Auth) {
    $scope.message = "Where the menu lives!";
    $scope.logout=function(){
      Auth.logout(function() {
        $location.path('/');
        $scope.$apply();
    });
  };
}]);