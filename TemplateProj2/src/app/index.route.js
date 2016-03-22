(function() {
  'use strict';

  angular
    .module('ipa')
    .config(routeConfig);
  
  /** @ngInject */
  function routeConfig($stateProvider,$urlRouterProvider){
    //default route
    $urlRouterProvider.otherwise('/mainscreen');
  }

})();
