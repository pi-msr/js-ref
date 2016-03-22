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
      state: 'fertility',
      config: {
        url: '/fertility',
        templateUrl: 'app/main/fertility/template.html',
        controller: 'FertilityController',
        controllerAs: 'vmFertility'
      }
    }];
  }
})();