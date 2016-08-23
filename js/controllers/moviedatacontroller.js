  app.controller('MovieDataCtrl', ['$rootScope', '$scope', '$location', '$firebaseArray', function ($rootScope, $scope, $location, $firebaseArray){

    var id = $rootScope.auth.uid.replace(':', '%3A');
    
    var movieRef = new Firebase('https://yourfilmagenda.firebaseio.com/movieinfo' + id);

    var movieListing = $firebaseArray(movieRef);


    $scope.movielisting = movieListing;

    $scope.addMovieData = function() {
      movieListing.$add({
        title: $scope.title,
        director: $scope.director || null,
        theater: $scope.theater || null,
        moviegoers: $scope.moviegoers || null,
        date: $scope.date || null,
        response: $scope.response || null,
        seenstatus: $scope.seenstatus
      });
      if($scope.seenstatus === true) {

        $location.path('/haveseen');
      }
      else{

        $location.path('tosee');
      }
      console.log('movie data added!!');
    };

      movieListing.$watch(function(event) {
        console.log(event);
      });

    $scope.deleteAMovie = function(movie) {
      console.log('delete button clicked for controller!');
      movieListing.$remove(movie);
      console.log("removed: " + movie);
      $location.path('/menu');
    }


    $scope.showListData = true;

    $scope.showListDataBtn = function() {
      $scope.showEditFields = false; 
      $scope.showListData = true;
    }

    $scope.showEditFieldsBtn = function(movie) {
      $scope.showEditFields = true; 
      $scope.showListData = false;
      $scope.movie = movie;
    }

    $scope.submitThis = function(movie) {
      $scope.showEditFields = false; 
      $scope.showListData = true;
      console.log('movie data edited!!');
    };

  }]);



