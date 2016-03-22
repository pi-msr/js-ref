(function() {
  'use strict';

  angular
    .module('compendium')
    .config(routerConfig);

  /** @ngInject */
  function routerConfig($ionicConfigProvider, $sceDelegateProvider, $urlRouterProvider) {

    $urlRouterProvider.otherwise('/');

    $ionicConfigProvider.views.transition('none');
    $ionicConfigProvider.views.maxCache(0);

    $sceDelegateProvider.resourceUrlWhitelist([
      // Allow same origin resource loads.
      'self',
      // Allow loading from assets domain.
      'http://images.contentful.com/**',
      'http://videos.contentful.com/**',
      'http://assets.contentful.com/**'
    ]);
  }

})();