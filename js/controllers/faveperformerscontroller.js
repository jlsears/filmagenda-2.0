  app.controller('PerformerCtrl', ['$rootScope', '$scope', '$location', '$firebaseArray', function ($rootScope, $scope, $location, $firebaseArray){

    var id = $rootScope.auth.uid.replace(':', '%3A');
    
    var artistRef = new Firebase('https://yourfilmagenda.firebaseio.com/artistinfo' + id);

    var artistListing = $firebaseArray(artistRef);

    var theProject = "";

    //movieRef.$bindTo($scope, "movieinfo");

    $scope.artistlisting = artistListing;

    $scope.addArtistData = function() {
      artistListing.$add({
        name: $scope.name,
        artist_type: $scope.artist_type,
        most_recent: 'placeholder'
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

    $scope.saveFire = function(artist) {

      $scope.most_recent = $scope.getTitle2;
      $scope.artist_type = 'Experiment this';

      var item = artistListing.$getRecord($scope.artist.$id);

      item.artist_type = 'more resetting';

      $scope.artist.most_recent = $scope.getTitle2

      artistListing.$save(item).then(function() {
        console.log("hitting the item save function");
      });
    }; // end saveFire


    $scope.findArtist = function(artist) {
      console.log("findArtist called!!!");

      $scope.artist = artist.name;
      var getTitle1;
      var getTitle2;
      //var titleUse = "unchanged";
      var titleinfo = "not changed";

      var newName = $scope.artist.replace(/ /g, "?");

      var suffix = ".json";
      var getArtistId = 0;
      var base_url = "https://api.themoviedb.org/3/search/person?api_key=inserthere&query=";
      var finalBaseUrl = base_url + newName;
      var second_url_Pt1 = "http://api.themoviedb.org/3/person/";
      var second_url_Pt2 = "/combined_credits?api_key=inserthere";

        // First API call: to find this artist's ID
      var getAll = $.ajax({
          url: finalBaseUrl,
          dataType: "jsonp",
          success: function(data){
              getArtistId = data.results[0].id;

      // Second API call: to retrieve that artist's info 
      var getAll2 = $.ajax({
          url: second_url_Pt1 + getArtistId + second_url_Pt2,
          dataType: "jsonp",
          success: function(moredata){
              var castData = moredata.cast[0].original_title;
              var lastItem = moredata.cast.length - 1;

              // Will be present if the object is a film
              $scope.getTitle1 = moredata.cast[lastItem].title;
              // Will be present if the object is a TV show
              $scope.getTitle2 = moredata.cast[lastItem].original_name;

              // This means the project is a TV show
              if (typeof getTitle1 === 'undefined') {
                titleinfo = moredata.cast[lastItem].original_name;
                $scope.artist = artist;
                $scope.most_recent = titleinfo;

              } else {
                //project is a film scenario here                 
              }
            },
          })
          getAll2.then($scope.saveFire);
        }
     });  // end initial ajax call
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
      console.log("artistListing for editing purposes: " + JSON.stringify(artistListing));
      artistListing.$save({
        name: $scope.name,
        artist_type: $scope.artist_type
      });
      $scope.showEditFields = false; 
      $scope.showListData = true;
      console.log('artist data edited!!');
    };

  }]);


