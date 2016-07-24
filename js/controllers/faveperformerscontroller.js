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
      //console.log("if passing data inside saveFire it's here: " + JSON.stringify(respTitle));
      //var lastItem2 = respTitle.cast.length - 1;

      //console.log("hit saveFire function itself and getTitle2 is: " + respTitle.cast[lastItem2].original_name);
      //console.log("and aritstListing is: " + JSON.stringify(artistListing));
      console.log("getTitle2 with scope in play shows as: " + $scope.getTitle2);
      console.log("artist in saveFire is: " + JSON.stringify($scope.artist));
      console.log("artistListing in saveFire is: " + JSON.stringify(artistListing));

      //$scope.artist = artist;
      $scope.most_recent = $scope.getTitle2;
      $scope.artist_type = 'Experiment this';

      console.log("artistRef is: " + artistRef);
      var item = artistListing.$getRecord($scope.artist.$id);

      console.log("artistListing id is: " + $scope.artist.$id);
      console.log("artistListing name is: " + $scope.artist.name);
      console.log("artistListing most_recent is: " + $scope.artist.most_recent);
      console.log("and again, getTitle2 is: " + $scope.getTitle2);

      //item.most_recent = $scope.getTitle2;
      item.artist_type = 'Experiment this';

      $scope.artist.most_recent = $scope.getTitle2

      artistListing.$save(item).then(function() {
        console.log("this the item save function");
      });
      
      console.log("something happened with the artist in saveFire, maybe?");
    }; // end saveFire


    $scope.findArtist = function(artist) {
      console.log("findArtist called!!!");
        console.log("aritstListing at this juncture: " + JSON.stringify(artistListing));
        $scope.artist = artist.name;
        //var captureArtist = artist;
        var getTitle1;
        var getTitle2;
        var titleUse = "unchanged";
        var titleinfo = "not changed";

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

          // First API call: to find this artist's ID
        var getAll = $.ajax({
            url: finalBaseUrl,
            dataType: "jsonp",
            success: function(data){
                console.log("printing data again!!");
                console.log(data);
                getArtistId = data.results[0].id;
                console.log("getting the id?: " + getArtistId);
                //$("#artistproject").append("Here's some data: " + getArtistId);

        // Second API call: to retrieve that artist's info 
        var getAll2 = $.ajax({
            url: second_url_Pt1 + getArtistId + second_url_Pt2,
            dataType: "jsonp",
            success: function(moredata){
                console.log(moredata);
                var castData = moredata.cast[0].original_title;
                var lastItem = moredata.cast.length - 1;

                // Will be present if the object is a film
                $scope.getTitle1 = moredata.cast[lastItem].title;
                // Will be present if the object is a TV show
                $scope.getTitle2 = moredata.cast[lastItem].original_name;
                console.log("getTitle2 is decreed: " + $scope.getTitle2);

                // This means the project is a TV show
                if (typeof getTitle1 === 'undefined') {
                  titleUse = "second";
                  titleinfo = moredata.cast[lastItem].original_name;
                  $scope.artist = artist;
                  $scope.most_recent = titleinfo;
                  $("#artistproject").empty().append(titleinfo);
                  artistListing.$save({
                    most_recent: titleinfo
                  });

                  $("#artistproject").html(getTitle2);

                } else {

                  titleUse = "first";
                  updateTitleUse(titleUse);
                  saveFire(getTitle1);
                  // This means the project is a film
                  $("#artistproject").html(getTitle1);
                  //theProject = getTitle1;
                    //console.log("Saving getTitle1 to theProject: " + getTitle1)
                    console.log("Hit else statement for getTitle1 scenario");
                    saveProject(saveFire);
                }
              },
            })

            getAll2.then($scope.saveFire);
              //saveFire(titleinfo);
            //.then(saveProject(saveFire)) // end second ajax call

          }
       });  // end initial ajax call

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


