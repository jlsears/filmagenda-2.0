  app.controller('PerformerCtrl', ['$rootScope', '$scope', '$location', '$firebaseArray', function ($rootScope, $scope, $location, $firebaseArray){

    var id = $rootScope.auth.uid.replace(':', '%3A');
    
    var artistRef = new Firebase('https://yourfilmagenda.firebaseio.com/artistinfo' + id);

    var artistListing = $firebaseArray(artistRef);

    //movieRef.$bindTo($scope, "movieinfo");

    $scope.artistlisting = artistListing;

    $scope.addArtistData = function() {
      artistListing.$add({
        name: $scope.name,
        artist_type: $scope.artist_type
      });
      $location.path('/menu');
      console.log('artist data added!!');
    };

      artistListing.$watch(function(event) {
        console.log(event);
      });

    $scope.deleteAnArtist = function(artist) {
      console.log('delete button clicked for artist controller!');
      artistListing.$remove(artist);
      console.log("Artist removed: " + artist);
      $location.path('/menu');
    };


    $scope.showListData = true;

    $scope.showListDataBtn = function() {
      $scope.showEditFields = false; 
      $scope.showListData = true;
    }

    $scope.showEditFieldsBtn = function(artist) {
      $scope.showEditFields = true; 
      $scope.showListData = false;
      $scope.artist = artist;
    }

    $scope.submitThis = function(artist) {
      artistListing.$save({
        name: $scope.name,
        artist_type: $scope.artist_type
      });
      $scope.showEditFields = false; 
      $scope.showListData = true;
      console.log('artist data edited!!');
    };

  }]);



