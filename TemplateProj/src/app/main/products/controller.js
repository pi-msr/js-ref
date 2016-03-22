(function() {
  'use strict';

  angular
    .module('compendium')
    .controller('MainController', MainController);

  /** @ngInject */
  function MainController($log, $scope, ContentService) {
    var vmMain = this;
    vmMain.entry = {};
    vmMain.entriesUpdate = entriesUpdate;
    $scope.$on('entriesUpdate', entriesUpdate);
    $scope.$on('$stateChangeSuccess', entriesUpdate);

    function entriesUpdate() {
      vmMain.entry = ContentService.getEntryByName('MainMenu');
    }


  }
})();