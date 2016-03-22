(function() {
  'use strict';

  angular
    .module('ipa')
    .config(config);

  /** @ngInject */
  function config($logProvider,$mdGestureProvider) {
    // Enable log
    $logProvider.debugEnabled(true);
    $mdGestureProvider.skipClickHijack(); // Don't hijack me bro   
  }

})();
