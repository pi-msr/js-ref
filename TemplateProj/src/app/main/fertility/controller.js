(function() {
  'use strict';

  angular
    .module('compendium')
    .controller('FertilityController', FertilityController);

  /** @ngInject */
  function FertilityController($log, $scope, ContentService) {
    var vmFertility = this;
    vmFertility.entry = {};
    vmFertility.entriesUpdate = entriesUpdate;
    $scope.$on('entriesUpdate', entriesUpdate);
    $scope.$on('$stateChangeSuccess', entriesUpdate);

    function entriesUpdate() {
      vmFertility.entry = ContentService.getEntryByName('Fertility Overview Menu');
    }


  }
})();