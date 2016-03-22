(function() {
  'use strict';
  angular
    .module('compendium')
    .controller('DataController', DataController);
  /** @ngInject */
  function DataController($log, $scope, $state, $timeout, ContentService) {
    var vmData = this;
    vmData.isBackward = false;
    vmData.swipeUp = swipeUp;
    vmData.swipeDown = swipeDown;
    vmData.entriesUpdate = entriesUpdate;
    vmData.routeToAsset = ContentService.routeToAsset;
    vmData.getAnimationClass = getAnimationClass;
    $scope.$on('entriesUpdate', entriesUpdate);
    $scope.$on('$ionicView.enter', entriesUpdate);

    function swipeUp() {
      $log.log('swipeUp');
      if (vmData.pageCurrent.pageAfter) {
        vmData.pushUp = true;
        var pageAfterId = vmData.pageCurrent.pageAfter.sys.id;
        $timeout(function() {
          ContentService.routeToEntry(pageAfterId, false);
        }, 1000);
      }
    }

    function swipeDown() {
      $log.log('swipeDown');
      if (vmData.pageCurrent.pageBefore) {
        vmData.pushDown = true;
        var pageBeforeId = vmData.pageCurrent.pageBefore.sys.id;
        $timeout(function() {
          ContentService.routeToEntry(pageBeforeId, true);
        }, 1000);
      }
    }

    function entriesUpdate() {
      $log.log('$state.params', $state.params);
      vmData.pushDown = false;
      vmData.pushUp = false;
      var pageName = $state.params.pageName;
      vmData.isEntering = true;
      vmData.isBackward = $state.params.isBackward;
      vmData.pageCurrent = ContentService.getEntryByName(pageName);

      if (!vmData.pageCurrent) {
        return;
      }
      // Data is the second item in Nav bar
      $scope.$emit('updateNavBarActiveIndex', 1);

      $scope.$emit('updateNavBarGif', '');
      if (vmData.pageCurrent.forwardGif && !vmData.isBackward) {
        vmData.showGif = vmData.pageCurrent.forwardGif.fields.file.url;
      }
      if (vmData.pageCurrent.backwardGif && vmData.isBackward) {
        vmData.showGif = vmData.pageCurrent.backwardGif.fields.file.url;
      }
      //$log.log('DataController entry', vmData.pageCurrent, vmData.pageBefore, vmData.pageAfter);
    }

    function getAnimationClass() {
      return {
        fadeOutDown: vmData.pushDown,
        fadeOutUp: vmData.pushUp,
        fadeInUp: vmData.isEntering && !vmData.isBackward,
        fadeInDown: vmData.isEntering && vmData.isBackward
      };
    }

  }
})();