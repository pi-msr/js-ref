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
      state: 'video',
      config: {
        url: '/video/{assetId}',
        templateUrl: 'app/video/template.html',
        controller: 'VideoController',
        controllerAs: 'vmVideo',
        params: {
          assetId: null
        }
      }
    }];
  }
})();