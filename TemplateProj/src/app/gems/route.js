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
      state: 'nav.gems',
      config: {
        url: '/gems/{entryId}/{pageName}',
        templateUrl: 'app/gems/template.html',
        controller: 'GemsController',
        controllerAs: 'vmGems',
        params: {
          entryId: null,
          pageName: null,
          isBackward: null,
          isNavFromFeatures: null
        }
      }
    }];
  }
})();