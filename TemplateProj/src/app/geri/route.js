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
      state: 'nav.geriFeature',
      config: {
        url: '/geriFeature/{entryId}/{pageName}',
        templateUrl: 'app/geri/template.html',
        controller: 'GeriFeatureController',
        controllerAs: 'vmGeriFeature',
        params: {
          entryId: null,
          pageName: null,
          isBackward: null
        }
      }
    }];
  }
})();