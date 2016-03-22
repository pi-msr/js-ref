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
      state: 'nav.geriConnect',
      config: {
        url: '/geriConnect/{entryId}/{pageName}',
        templateUrl: 'app/geri-connect-assess/template.html',
        controller: 'GeriConnectController',
        controllerAs: 'vmGeriConnect',
        params: {
          entryId: null,
          pageName: null,
          isBackward: null,
          isNavFromFeatures:null
        }
      }
    }];
  }
})();