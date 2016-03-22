(function() {
  'use strict';
  angular
    .module('compendium')
    .controller('GeriFeatureController', GeriFeatureController);
  /** @ngInject */
  function GeriFeatureController($log, $scope, $state, $timeout, ContentService) {
    var vmGeriFeature = this;
    vmGeriFeature.isBackward = false;
    vmGeriFeature.swipeUp = swipeUp;
    vmGeriFeature.swipeDown = swipeDown;
    vmGeriFeature.entriesUpdate = entriesUpdate;
    vmGeriFeature.routeToAsset = ContentService.routeToAsset;
    vmGeriFeature.getAnimationClass = getAnimationClass;
    $scope.$on('entriesUpdate', entriesUpdate);
    $scope.$on('$ionicView.enter', entriesUpdate);

    function swipeUp() {
      $log.log('swipeUp');
      if (vmGeriFeature.pageCurrent.pageAfter) {
        vmGeriFeature.pushUp = true;
        var pageAfterId = vmGeriFeature.pageCurrent.pageAfter.sys.id;
        $timeout(function() {
          ContentService.routeToEntry(pageAfterId, false);
        }, 1000);
      } else {
        vmGeriFeature.isBouncing = true;
        $timeout(function() {
          vmGeriFeature.isBouncing = false;
        }, 1000);
      }
    }

    function swipeDown() {
      $log.log('swipeDown');
      if (vmGeriFeature.pageCurrent.pageBefore) {
        vmGeriFeature.pushDown = true;
        var pageBeforeId = vmGeriFeature.pageCurrent.pageBefore.sys.id;
        $timeout(function() {
          ContentService.routeToEntry(pageBeforeId, true);
        }, 1000);
      }
    }

    function entriesUpdate() {
      $log.log('$state.params', $state.params);
      vmGeriFeature.pushDown = false;
      vmGeriFeature.pushUp = false;
      var entryId = $state.params.entryId;
      vmGeriFeature.isEntering = true;
      vmGeriFeature.isBackward = $state.params.isBackward;
      vmGeriFeature.pageCurrent = ContentService.getEntryById(entryId);

      if (!vmGeriFeature.pageCurrent) {
        return;
      }
      $scope.$emit('updateNavBarActiveIndex', 0);
      $scope.$emit('updateLogo', 0);

      if (vmGeriFeature.pageCurrent.forwardGif && !vmGeriFeature.isBackward) {
        vmGeriFeature.showGif = vmGeriFeature.pageCurrent.forwardGif.fields.file.url;
      }
      if (vmGeriFeature.pageCurrent.backwardGif && vmGeriFeature.isBackward) {
        vmGeriFeature.showGif = vmGeriFeature.pageCurrent.backwardGif.fields.file.url;
      }

      $scope.$emit('updateNavBarGif', vmGeriFeature.showGif);

      vmGeriFeature.isGifPlaying = true;
      $timeout(function() {
        vmGeriFeature.isGifPlaying = false;
      }, 1000);
      //$log.log('GeriFeatureController entry', vmGeriFeature.pageCurrent, vmGeriFeature.pageBefore, vmGeriFeature.pageAfter);
    }

    function getAnimationClass() {
      return {
        fadeOutDown: vmGeriFeature.pushDown,
        fadeOutUp: vmGeriFeature.pushUp,
        fadeInUp: vmGeriFeature.isGifPlaying && !vmGeriFeature.isBackward,
        fadeInDown: vmGeriFeature.isGifPlaying && vmGeriFeature.isBackward,
        bounce: vmGeriFeature.isBouncing
      };
    }

  }
})();