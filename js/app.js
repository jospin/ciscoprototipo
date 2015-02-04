
// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'


var myApp = angular.module('starter', ['ionic', 'firebase'])

myApp.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if(window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }
  });
});

myApp.config(function($stateProvider, $urlRouterProvider) {

  $stateProvider
    .state('login', {
      url: '/login',
      templateUrl: 'templates/login.html',
      controller: 'loginCtrl'
    })

    .state('tabs', {
      url: '/tab',
      abstract: true,
      templateUrl: 'templates/tabs.html'
    })

    .state('tabs.home', {
      url: '/home',
      views: {
        'home-tab': {
          templateUrl: 'templates/home.html',
          controller: 'HomeTabCtrl'
        }
      }
    })

    .state('tabs.about', {
      url: '/about',
      views: {
        'about-tab': {
          templateUrl: 'templates/about.html'
        }
      }
    })

    .state('tabs.navstack', {
      url: '/navstack',
      views: {
        'about-tab': {
          templateUrl: 'templates/nav-stack.html'
        }
      }
    });


   $urlRouterProvider.otherwise('/login');

});

myApp.controller("loginCtrl", function($scope, $rootScope, $firebase, $firebaseSimpleLogin) {
    // Get a reference to the Firebase
    var firebaseRef = new Firebase("https://mt4cisco.firebaseio.com/");


      // Create a Firebase Simple Login object
      $scope.auth = $firebaseSimpleLogin(firebaseRef);

      // Initially set no user to be logged in
      $scope.user = null;

      // Logs a user in with inputted provider
      $scope.login = function(provider) {
        $scope.auth.$login(provider);
      };

      // Logs a user out
      $scope.logout = function() {
        $scope.auth.$logout();
      };

      // Upon successful login, set the user object
      $rootScope.$on("$firebaseSimpleLogin:login", function(event, user) {
        $scope.user = user;
        console.log($scope.user);
      });

      // Upon successful logout, reset the user object
      $rootScope.$on("$firebaseSimpleLogin:logout", function(event) {
        $scope.user = null;
      });

      // Log any login-related errors to the console
      $rootScope.$on("$firebaseSimpleLogin:error", function(event, error) {
        console.log("Falha no login: ", error);
      });
});
/*
.controller('HomeCtrl', function($scope, $state) {

  $scope.confirm = function(params) {
    $state.go('tabs.sucess');
  };
})

.controller('HomeTabCtrl', function($scope) {
  console.log('HomeTabCtrl');
})
*/