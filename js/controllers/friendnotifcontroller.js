  app.controller('FriendNotifCtrl', ['$rootScope', '$scope', '$location', '$firebaseArray', function ($rootScope, $scope, $location, $firebaseArray){
    $scope.message = "Friend notification place!"

    var id = $rootScope.auth.uid.replace(':', '%3A');
    
    var notifRef = new Firebase('https://yourfilmagenda.firebaseio.com/notifications' + id);

    var notifEntries = $firebaseArray(notifRef);

    //movieRef.$bindTo($scope, "movieinfo");

    $scope.notifentries = notifEntries;

    $scope.sendNotif = function() {
      notifEntries.$add({
        phoneNumber: $scope.phoneNumber,
        messageContent: $scope.messageContent
      });
      $location.path('/menu');
      console.log('notification data added!!');
    };
  }]);

