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

    $scope.findArtist = function() {
        console.log("findArtist called!!!");
        var suffix = ".json";
        var getArtistId = 0;
        var base_url = "https://api.themoviedb.org/3/search/person?api_key=inserthere&query=tilda?swinton";
        var second_url = "http://api.themoviedb.org/3/person/3063/combined_credits?api_key=inserthere";
          console.log(base_url);
        $.ajax({
            url: base_url,
            dataType: "jsonp",
            success: function(data){
                console.log("printing data again!!");
                console.log(data);
                getArtistId = data.results[0].id;
                //$("#artistproject").append("Here's some data: " + getArtistId);

        $.ajax({
            url: second_url,
            dataType: "jsonp",
            success: function(moredata){
                console.log(moredata);
                var castData = moredata.cast[0].original_title;
                var castLength = moredata.cast.length;
                var lastItem = castLength - 1;
                var getTitle1 = moredata.cast[lastItem].title;
                var getTitle2 = moredata.cast[lastItem].original_name;

                if (getTitle1) {
                  $("#artistproject").append("Title data here: " + getTitle1);

                } else {
                  $("#artistproject").append("Title data here: " + getTitle2);                  
                }

                console.log("the array length: " + castLength);
                console.log("data at index 0: " + castData);
                console.log("castLength - 1: " + lastItem);
                console.log("Title here: " + getTitle)
              }
            })  
          }
       })  
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



