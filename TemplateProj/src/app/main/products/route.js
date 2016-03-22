(function() {
  'use strict';

  angular
    .module('compendium')
    .run(appRun);

  /* @ngInject */
  function appRun(RouterHelper) {
    RouterHelper.configureStates(getStates());
  }

  function getStates() {
    return [{
      state: 'home',
      config: {
        url: '/main',
        templateUrl: 'app/main/products/template.html',
        controller: 'MainController',
        controllerAs: 'vmMain'
      }
    }];
  }
})();