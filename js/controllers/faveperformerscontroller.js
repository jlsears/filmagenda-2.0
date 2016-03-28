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

    $scope.findArtist = function(artist) {
/*    function newProject(thisOne) {
      artistListing.$save({
        most_recent: thisOne
      });
      console.log('We are at least hitting the function for: ' + thisOne);
    };
*/        console.log("findArtist called!!!");
        $scope.artist = artist.name;
        //var captureArtist = artist;
        var getTitle1;
        var getTitle2;
        console.log("artist name?: " + $scope.artist);
        var newName = $scope.artist.replace(/ /g, "?");
        console.log("get name api call ready: " + newName);

        var suffix = ".json";
        var getArtistId = 0;
        var base_url = "https://api.themoviedb.org/3/search/person?api_key=inserthere&query=";
        var finalBaseUrl = base_url + newName;
        var second_url_Pt1 = "http://api.themoviedb.org/3/person/";
        var second_url_Pt2 = "/combined_credits?api_key=inserthere";
        //var theProject;
          console.log(finalBaseUrl);
        $.ajax({
            url: finalBaseUrl,
            dataType: "jsonp",
            success: function(data){
                console.log("printing data again!!");
                console.log(data);
                getArtistId = data.results[0].id;
                console.log("getting the id?: " + getArtistId);
                //$("#artistproject").append("Here's some data: " + getArtistId);

        $.ajax({
            url: second_url_Pt1 + getArtistId + second_url_Pt2,
            dataType: "jsonp",
            success: function(moredata, artist){
                console.log(moredata);
                var castData = moredata.cast[0].original_title;
                var lastItem = moredata.cast.length - 1;
                getTitle1 = moredata.cast[lastItem].title;
                getTitle2 = moredata.cast[lastItem].original_name;

                if (typeof getTitle1 === 'undefined') {
                  $("#artistproject").html(getTitle2);
                 theProject = getTitle2;
                    console.log("Saving getTitle2 to theProject: " + getTitle2);
                    console.log("And the type of getTitle2 is: " + typeof getTitle2);
                } else {
                  $("#artistproject").html(getTitle1);
                  theProject = getTitle1;
                    console.log("Saving getTitle1 to theProject: " + getTitle1)
                }
                console.log("First title possibility here: " + getTitle1);
                console.log("Second title possibility here: " + getTitle2);
              }
            })
          }
       });  
        console.log("Look, theProject holds a variable and it's: " + theProject);
            artistListing.$save({
              most_recent: theProject
          }); 
       console.log("Did we save theProject successfully? " + theProject);
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


