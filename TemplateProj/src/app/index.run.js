(function() {
  'use strict';

  angular
    .module('compendium')
    .run(runBlock);

  /** @ngInject */
  function runBlock($log, $rootScope, ContentService) {

    ContentService.init();
    $log.debug('runBlock end');

    $rootScope.featureButtonClick = ContentService.featureButtonClick;
  }

})();