app.controller('AuthCtrl', ['$scope', '$location', 'Auth', '$firebaseArray', '$firebaseAuth', function($scope, $location, Auth, $firebaseArray, $firebaseAuth){

     $scope.login = function() {
      Auth.login($scope.user.email, $scope.user.password, function() {
        $location.path('/menu');
        $scope.$apply();
      });
    };

    $scope.register = function() {
      Auth.register($scope.user.email, $scope.user.password, function() {
        Auth.login($scope.user.email, $scope.user.password, function() {
         $location.path('/');
          $scope.$apply();
        });
      });
    };

    $scope.logout=function(){
      Auth.logout(function() {
        $location.path('/');
        $scope.$apply();
      });
    };
  }]);