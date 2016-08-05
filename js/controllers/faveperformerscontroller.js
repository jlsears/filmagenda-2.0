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
        most_recent: 'placeholder',
        media_type: 'placeholder2'
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

      //$scope.most_recent = $scope.getTitle1;
      $scope.artist_type = 'Experiment NOW';

      var item = artistListing.$getRecord($scope.artist.$id);
      //console.log("artistListing: " + JSON.stringify(artistListing));
      console.log("artist inside saveFire: " + JSON.stringify(artist));
      console.log("and: " + item);

      //item.artist_type = 'experimenting NOW';

      console.log("ultimate title in saveFire: " + $scope.getTitle2);

      $scope.artist.arist_type = 'experimenting NOW'
      $scope.artist.most_recent = $scope.getTitle2
      //$scope.artist.media_type = $scope.format_type

      artistListing.$save(item);

    }; // end saveFire


    $scope.findArtist = function(artist) {
      console.log("findArtist called!!!");

      $scope.artist = artist.name;
      var getTitle1;
      var getTitle2;
      var format_type;
      var format_type1;
      //var titleUse = "unchanged";
      var titleinfo = "not changed";
      var winningTitle = "";

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

              $scope.artist = artist;

              // cast variables
              var castData = moredata.cast[0].original_title;

              //console.log("castData: " + castData);
              //console.log("moredata: " + JSON.stringify(moredata));

              var lastItem = moredata.cast.length - 1;
              //var lastItem2 = moredata.crew.length - 1;

              // Comparing first air dates

              console.log("before loop: " + moredata.cast[0].release_date);

              for(var i = 0; i < lastItem-1; i++) {
                //console.log("inside for loop");

                //var finished = 0;

                var firstMovie = moredata.cast[i].media_type;
                var secMovie = moredata.cast[i+1].media_type;

                if(firstMovie == "movie" && secMovie == "movie") {

                var firstDate = moredata.cast[i].release_date;
                var secDate = moredata.cast[i+1].release_date;

                //console.log("firstDate: " + firstDate);
                //console.log("secDate: " + secDate);

                if(firstDate > secDate) {
                  //console.log("inside if statement: " + moredata.cast[i].original_title);

                  $scope.getTitle2 = moredata.cast[i].original_title;
                  //$scope.format_type = moredata.cast[i].media_type || null;
                  console.log("winning title is: " + $scope.getTitle2);

                }
                //console.log("artist in the loop: " + JSON.stringify(artist));

/*                if(i == lastItem-2); {
                  $scope.saveFire(artist);
                }
*/              
                }
              } // end for loop
              

              //console.log("artist: " + JSON.stringify(artist.name));
              //console.log("the moredata: " + JSON.stringify(moredata));
              //console.log("crew title: " + JSON.stringify(moredata.crew[lastItem2].title));
              //console.log("crew media type: " + JSON.stringify(moredata.crew[lastItem2].media_type));
              //console.log("the lastItem2: " + lastItem2);

              // Will be present for crew data
              //$scope.getTitle1 = moredata.crew[lastItem2].title;
              //$scope.format_type1 = moredata.crew[lastItem2].media_type;

              // Will be present for cast data
              //$scope.getTitle2 = moredata.cast[lastItem].original_name;
              //$scope.format_type = moredata.cast[lastItem].media_type;

              // This means the project is a TV show
/*              if (typeof getTitle1 === 'undefined') {
                titleinfo = moredata.cast[lastItem].original_name;
                $scope.artist = artist;
                $scope.most_recent = titleinfo;

              } else {
                //project is a film scenario here                 
              }
*/            },
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


