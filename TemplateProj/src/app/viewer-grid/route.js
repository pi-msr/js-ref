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
      state: 'viewer-grid',
      config: {
        url: '/viewer-grid/{assetId}',
        templateUrl: 'app/viewer-grid/template.html',
        controller: 'ViewerGridController',
        controllerAs: 'vmViewerGrid',
        params: {
          assetId: null
        }
      }
    }];
  }
})();