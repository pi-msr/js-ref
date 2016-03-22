(function() {
  'use strict';
  angular
    .module('compendium')
    .controller('DocumentController', DocumentController);
  /** @ngInject */
  function DocumentController($log, $scope, $state, $timeout, ContentService) {
    var vmDocument = this;
    vmDocument.isBackward = false;
    vmDocument.swipeUp = swipeUp;
    vmDocument.swipeDown = swipeDown;
    vmDocument.entriesUpdate = entriesUpdate;
    vmDocument.routeToAsset = ContentService.routeToAsset;
    vmDocument.getAnimationClass = getAnimationClass;
    vmDocument.getColumnCount = getColumnCount;
    $scope.$on('entriesUpdate', entriesUpdate);
    $scope.$on('$ionicView.enter', entriesUpdate);

    function swipeUp() {
      $log.log('swipeUp');

      if (vmDocument.pageCurrent.pageAfter) {
        vmDocument.pushUp = true;
        var pageAfterId = vmDocument.pageCurrent.pageAfter.sys.id;
        $timeout(function() {
          ContentService.routeToEntry(pageAfterId, false);
        }, 1000);
      } else {
        vmDocument.isBouncing = true;
        $timeout(function() {
          vmDocument.isBouncing = false;
        }, 1000);
      }
    }

    function swipeDown() {
      $log.log('swipeDown');
      if (vmDocument.pageCurrent.pageBefore) {
        vmDocument.pushDown = true;
        var pageBeforeId = vmDocument.pageCurrent.pageBefore.sys.id;
        $timeout(function() {
          ContentService.routeToEntry(pageBeforeId, true);
        }, 1000);
      }
    }

    function entriesUpdate() {
      $log.log('$state.params', $state.params);
      vmDocument.pushDown = false;
      vmDocument.pushUp = false;
      var pageName = $state.params.pageName;
      vmDocument.isEntering = true;
      vmDocument.isBackward = $state.params.isBackward;
      vmDocument.pageCurrent = ContentService.getEntryByName(pageName);

      if (!vmDocument.pageCurrent) {
        return;
      }
      $scope.$emit('updateNavBarActiveIndex', 2);

      $scope.$emit('updateNavBarGif', '');

      if (vmDocument.pageCurrent.forwardGif && !vmDocument.isBackward) {
        vmDocument.showGif = vmDocument.pageCurrent.forwardGif.fields.file.url;
      }
      if (vmDocument.pageCurrent.backwardGif && vmDocument.isBackward) {
        vmDocument.showGif = vmDocument.pageCurrent.backwardGif.fields.file.url;
      }

      $timeout(function() {
        vmDocument.isEntering = false;
      }, 1000);
      //$log.log('DocumentController entry', vmDocument.pageCurrent, vmDocument.pageBefore, vmDocument.pageAfter);
    }

    function getAnimationClass() {
      return {
        fadeOutDown: vmDocument.pushDown,
        fadeOutUp: vmDocument.pushUp,
        fadeInUp: vmDocument.isEntering && !vmDocument.isBackward,
        fadeInDown: vmDocument.isEntering && vmDocument.isBackward,
        bounce: vmDocument.isBouncing
      };
    }

    function getColumnCount() {
      vmDocument.columnCount = 1;
      if (vmDocument.pageCurrent && vmDocument.pageCurrent.featureButtons && vmDocument.pageCurrent.featureButtons.length > 6) {
        vmDocument.columnCount = 2;
      }
      var ngClass = {
        'column-count1': vmDocument.columnCount == 1,
        'column-count2': vmDocument.columnCount == 2
      };
      return ngClass;
    }

  }
})();