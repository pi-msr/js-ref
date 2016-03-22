(function() {
  'use strict';

  angular
    .module('compendium')
    .controller('IvfController', IvfController);

  /** @ngInject */
  function IvfController($log, $scope, ContentService) {
    var vmIvf = this;
    vmIvf.entry = {};
    vmIvf.entriesUpdate = entriesUpdate;
    $scope.$on('entriesUpdate', entriesUpdate);
    $scope.$on('$stateChangeSuccess', entriesUpdate);

    function entriesUpdate() {
      vmIvf.entry = ContentService.getEntryByName('IVF Overview Menu');
    }

  }
})();