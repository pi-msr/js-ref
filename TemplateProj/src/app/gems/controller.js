(function() {
  'use strict';
  angular
    .module('compendium')
    .controller('GemsController', GemsController);
  /** @ngInject */
  function GemsController($log, $scope, $state, $timeout, ContentService) {
    var vmGems = this;
    vmGems.isBackward = false;
    vmGems.isNavFromFeatures = false;
    vmGems.swipeUp = swipeUp;
    vmGems.swipeDown = swipeDown;
    vmGems.entriesUpdate = entriesUpdate;
    vmGems.routeToAsset = ContentService.routeToAsset;
    vmGems.getAnimationClass = getAnimationClass;
    $scope.$on('entriesUpdate', entriesUpdate);
    $scope.$on('$ionicView.enter', entriesUpdate);

    function swipeUp() {
      $log.log('swipeUp');
      if (vmGems.pageCurrent.pageAfter) {
        vmGems.pushUp = true;
        var pageAfterId = vmGems.pageCurrent.pageAfter.sys.id;
        $timeout(function() {
          ContentService.routeToEntry(pageAfterId, false);
        }, 1000);
      } else {
        vmGems.isBouncing = true;
        $timeout(function() {
          vmGems.isBouncing = false;
        }, 1000);
      }
    }

    function swipeDown() {
      $log.log('swipeDown');
      if (vmGems.pageCurrent.pageBefore) {
        vmGems.pushDown = true;
        var pageBeforeId = vmGems.pageCurrent.pageBefore.sys.id;
        $timeout(function() {
          ContentService.routeToEntry(pageBeforeId, true);
        }, 1000);
      }
    }

    function entriesUpdate() {
      $log.log('$state.params', $state.params);
      vmGems.pushDown = false;
      vmGems.pushUp = false;
      var entryId = $state.params.entryId;
      vmGems.isEntering = true;
      vmGems.isBackward = $state.params.isBackward;
      vmGems.pageCurrent = ContentService.getEntryById(entryId);
      vmGems.pageName = $state.params.pageName;
      vmGems.isNavFromFeatures = $state.params.isNavFromFeatures;
      if (!vmGems.pageCurrent) {
        return;
      }

      if (vmGems.pageName.indexOf('Assess') == -1) {
        $scope.$emit('updateNavBarActiveIndex', 0);
        $scope.$emit('updateLogo', 0);
      } else {
        $scope.$emit('updateNavBarActiveIndex', 1);
        $scope.$emit('updateLogo', 1);

      }

      if (vmGems.pageCurrent.forwardGif && !vmGems.isBackward) {
        vmGems.showGif = vmGems.pageCurrent.forwardGif.fields.file.url;
      }
      if (vmGems.pageCurrent.backwardGif && vmGems.isBackward) {
        vmGems.showGif = vmGems.pageCurrent.backwardGif.fields.file.url;
      }

      if (vmGems.isNavFromFeatures) {
        $scope.$emit('updateNavBarGif', vmGems.showGif, true);
      } else {
        $scope.$emit('updateNavBarGif', vmGems.showGif);
      }

      if (vmGems.isNavFromFeatures) {
        vmGems.isGifPlaying = false;
      } else {
        vmGems.isGifPlaying = true;
        $timeout(function() {
          vmGems.isGifPlaying = false;
        }, 1000);
      }
      //$log.log('GemsController entry', vmGems.pageCurrent, vmGems.pageBefore, vmGems.pageAfter);
    }

    function getAnimationClass() {
      var animationClasses = {
        fadeOutDown: vmGems.pushDown,
        fadeOutUp: vmGems.pushUp,
        fadeInUp: vmGems.isGifPlaying && !vmGems.isBackward,
        fadeInDown: vmGems.isGifPlaying && vmGems.isBackward,
        bounce: vmGems.isBouncing,
        slideInRight: vmGems.isNavFromFeatures
      };
      return animationClasses;
    }

  }
})();