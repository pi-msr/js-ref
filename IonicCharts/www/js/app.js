// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
angular.module('starter', ['ionic','ngMaterial','nvd3'])
       .run(run)
       .config(config);

function run($ionicPlatform) {
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
}

function config($stateProvider, $urlRouterProvider){
    
  $stateProvider.state('dashboard',{
        url:'/',
        templateUrl:'js/dashboard/dashboard.html',
        controller:'DashCtrl',
        controllerAs: 'vm'
      });

    $stateProvider.state('charts',{
        url:'/charts',
        templateUrl:'js/charts/charts.html',
        controller:'ChartCtrl',
        controllerAs: 'vm'
      });

     $urlRouterProvider.otherwise('/charts');
}
