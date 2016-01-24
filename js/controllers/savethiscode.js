app.controller('AuthCtrl', ['$scope', '$location', 'Auth', '$firebaseArray', '$firebaseAuth', function($scope, $location, Auth, $firebaseArray, $firebaseAuth){

    $scope.user={}

    var userRef = new Firebase('https://yourfilmagenda.firebaseio.com/userinfo');

    auth = $firebaseAuth(userRef);

    $scope.userListing = $firebaseArray(userRef);

    $scope.login = function() {
      console.log('jjjjjjjj');
      userRef.authWithPassword({
        email    : $scope.user.email,
        password : $scope.user.password
      }, function(error, authData) {
        if (error) {
          console.log("Login Failed!", error);
        } else {
          console.log("Authenticated successfully with payload:", authData);
        }
      });
    };

      //$scope.auth = firebaseSimpleLogin(userRef);
      //auth.$firebaseSimpleLogin().then(function(authData) {
        //$scope.authData = authData;
      // }).catch(function(error) {
      //   $scope.error = error;
      //   console.log('login action!');
      //Auth.login($scope.user.email, $scope.user.password, function() {
        //$location.path('/menu');
        //$scope.$apply();
      //});


    $scope.register = function() {
      $scope.userListing.$add($scope.user)
      //Auth.register($scope.user.email, $scope.user.password, function() {
        //Auth.login($scope.user.email, $scope.user.password, function() {
         // $location.path('/login');
          //$scope.$apply();
      //   });
      // });
    };

    $scope.logout=function(){
      Auth.logout(function() {
        $location.path('/');
        $scope.$apply();
      });
    };
  }]);

/***************************
Movie Data controller
***************************/

  app.controller('MovieDataCtrl', ['$rootScope', '$scope', 'MovieData', '$firebaseArray', function ($rootScope, $scope, MovieData, $firebaseArray){

    var movieRef = new Firebase('https://yourfilmagenda.firebaseio.com/movieinfo');

    $scope.movieListing = $firebaseArray(movieRef);

    movieRef.$bindTo($scope, "movieinfo");


    $scope.addMovieData = function() {
      $scope.movieListing.$add({
      // var id = $rootScope.auth.uid.replace(':', '%3A');
      // MovieData.addMovieData(id, $scope.newMovieData, function () {
      //   console.log('Movie entry created!!!')
      //   $scope.newMovieData = {};
      });
    };

    var getList = function() {
      var id = $rootScope.auth.uid.replace(':', '%3A');
      MovieData.getMyMovieData(id, function (moviedatas) {
        console.log(moviedatas);
        return $scope.moviedatas = moviedatas;
      });
    };
    getList();

    $scope.deleteMovieData = function(moviedata) {
      var id = $rootScope.auth.uid.replace(':', '%3A');
      MovieData.deleteMovieData(id, moviedata, function () {
        console.log(moviedata);
        console.log("Delete button clicked!");
        getList();
      })
    }

  }]);



