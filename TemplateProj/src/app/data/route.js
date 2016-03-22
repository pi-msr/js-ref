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
      state: 'nav.data',
      config: {
        url: '/data/{pageName}',
        templateUrl: 'app/data/template.html',
        controller: 'DataController',
        controllerAs: 'vmData',
        params: {
          isBackward: null
        }
      }
    }];
  }
})();