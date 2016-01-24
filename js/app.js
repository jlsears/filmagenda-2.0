var app = angular.module('myApp', ['ngRoute', 'firebase']);

app.config(['$routeProvider', function ($routeProvider) {
  $routeProvider
    .when('/', {
      templateUrl: 'partials/home.html',
      controller: 'AuthCtrl'
    }).
    when('/menu', {
      templateUrl: 'partials/menu.html',
      controller: 'MenuCtrl'
    }).
    when('/register', {
      templateUrl: 'partials/register.html',
      controller: 'AuthCtrl'
    }).
    when('/login', {
      templateUrl: 'partials/login.html',
      controller: 'AuthCtrl'
    }).
    when('/faveperformers', {
      templateUrl: 'partials/faveperformers.html',
      controller: 'PerformerCtrl'
    }).
    when('/friendnotif', {
      templateUrl: 'partials/friendnotif.html',
      controller: 'FriendNotifCtrl'
    }).
    when('/movieenter', {
      templateUrl: 'partials/movieenter.html',
      controller: 'MovieDataCtrl'
    }).
    when('/artistenter', {
      templateUrl: 'partials/artistenter.html',
      controller: 'PerformerCtrl'
    }).
    when('/haveseen', {
      templateUrl: 'partials/haveseen.html',
      controller: 'MovieDataCtrl'
    }).
    when('/localshow', {
      templateUrl: 'partials/localshow.html',
      controller: 'LocalShowCtrl'
    }).
    when('/thetweets', {
      templateUrl: 'partials/thetweets.html',
      controller: 'TheTweetsCtrl'
    }).
    when('/tosee', {
      templateUrl: 'partials/tosee.html',
      controller: 'MovieDataCtrl'
    }).
    otherwise({
      redirectTo: '/'
        });
    }]);

app.constant('API_URL', 'https://yourfilmagenda.firebaseio.com/');
