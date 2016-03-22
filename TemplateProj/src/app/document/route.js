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
      state: 'nav.document',
      config: {
        url: '/document/{pageName}',
        templateUrl: 'app/document/template.html',
        controller: 'DocumentController',
        controllerAs: 'vmDocument',
        params: {
          isBackward: null
        }
      }
    }];
  }
})();