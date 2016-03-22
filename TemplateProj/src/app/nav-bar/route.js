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
      state: 'nav',
      config: {
        url: '/nav',
        templateUrl: 'app/nav-bar/template.html',
        controller: 'NavBarController',
        controllerAs: 'vmNavBar',
        abstract: true
      }
    }];
  }
})();