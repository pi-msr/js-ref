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
      state: 'ivf',
      config: {
        url: '/ivf',
        templateUrl: 'app/main/ivf/template.html',
        controller: 'IvfController',
        controllerAs: 'vmIvf'
      }
    }];
  }
})();