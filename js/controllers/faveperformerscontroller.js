  app.controller('PerformerCtrl', ['$rootScope', '$scope', '$interval', '$location', '$firebaseArray', function ($rootScope, $scope, $interval, $location, $firebaseArray){

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
        most_recent: 'pending',
        media_type: 'placeholder2',
        release_date: 'pending'
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

      var item = JSON.stringify(artist);

      var getItem = $scope.item;
      var currentItem = artistListing.$getRecord(getItem);

      $scope.artist.most_recent = $scope.getTitle2
      $scope.artist.media_type = $scope.format_type
      $scope.artist.release_date = $scope.release_date

      artistListing.$save(currentItem);

    }; 

    $scope.findArtist = function(artist) {
      console.log("findArtist called!!!");

      $scope.artist = artist;
      var getTitle1;
      var getTitle2;
      var format_type;
      var format_type1;
      var release_date;
      var titleinfo = "not changed";
      var winningTitle = "";
      var item = "";

      var newName = artist.name.replace(/ /g, "?");

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

              // cast variables for locating performer data
              if($scope.artist.artist_type == "Performer") {

                var castData = moredata.cast[0].original_title;

                var lastItem = moredata.cast.length;

                var winningDate = 0;


              for(var i = 0; i < lastItem; i++) {


                var firstMovie = moredata.cast[i].media_type;

                if(firstMovie == "movie") {

                  var firstDate = Date.parse(moredata.cast[i].release_date);                  

                  if(firstDate > winningDate) {

                    winningDate = firstDate;

                    $scope.getTitle2 = moredata.cast[i].original_title;
                    $scope.format_type = moredata.cast[i].media_type;
                    $scope.release_date = moredata.cast[i].release_date;
                    $scope.item = artist.$id;
                  } // end if firstDate > winningDate
                } // end if firstMovie == "movie"
              } // end for loop

           } // end if cast statement
           
           // crew variables for locating director data
           else {

                var crewData = moredata.crew[0].original_title;

                var lastItem = moredata.crew.length;

                var winningDate = 0;

              for(var i = 0; i < lastItem; i++) {


                var firstMovie = moredata.crew[i].media_type;

                if(firstMovie == "movie") {

                  var firstDate = Date.parse(moredata.crew[i].release_date); 

                  if(firstDate > winningDate) {

                    winningDate = firstDate;

                    $scope.getTitle2 = moredata.crew[i].original_title;
                    $scope.format_type = moredata.crew[i].media_type;
                    $scope.release_date = moredata.crew[i].release_date;
                    $scope.item = artist.$id;
                  } // end if firstDate > winningDate
                } // end if firstMovie == "movie"
              } // end for loop
            }
          },
        })

          getAll2.then($scope.saveFire);
        }
     });  // end initial ajax call
    };

    $scope.ruleAll = function(findArtist) {

      //for loop to rotate through artists

      for(var j=0; j < artistListing.length; j++) {

        $scope.findArtist(artistListing[j]);
        console.log("running function for: " + artistListing[j].$id);

        } // end for loop
    };

    $interval( function() { $scope.ruleAll(); }, 15000);

    //$scope.ruleAll($scope.findArtist);

    //var needTimer = true;

    
  
/*    setInterval(function(){
      var date = new Date();
      if(date.getHours === 22 && date.getMinutes === 1) {
        console.log("setInterval function called!");
        $scope.ruleAll($scope.findArtist);
      }
    }, 60000); */   
    


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


