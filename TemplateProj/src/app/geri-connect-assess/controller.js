(function() {
  'use strict';
  angular
    .module('compendium')
    .controller('GeriConnectController', GeriConnectController);
  /** @ngInject */
  function GeriConnectController($log, $scope, $state, $timeout, ContentService) {
    var vmGeriConnect = this;
    vmGeriConnect.isBackward = false;
    vmGeriConnect.isNavFromFeatures = false;
    vmGeriConnect.swipeUp = swipeUp;
    vmGeriConnect.swipeDown = swipeDown;
    vmGeriConnect.entriesUpdate = entriesUpdate;
    vmGeriConnect.routeToAsset = ContentService.routeToAsset;
    vmGeriConnect.getAnimationClass = getAnimationClass;
    $scope.$on('entriesUpdate', entriesUpdate);
    $scope.$on('$ionicView.enter', entriesUpdate);

    function swipeUp() {
      $log.log('swipeUp');
      if (vmGeriConnect.pageCurrent.pageAfter) {
        vmGeriConnect.pushUp = true;
        var pageAfterId = vmGeriConnect.pageCurrent.pageAfter.sys.id;
        $timeout(function() {
          ContentService.routeToEntry(pageAfterId, false);
        }, 1000);
      } else {
        vmGeriConnect.isBouncing = true;
        $timeout(function() {
          vmGeriConnect.isBouncing = false;
        }, 1000);
      }
    }

    function swipeDown() {
      $log.log('swipeDown');
      if (vmGeriConnect.pageCurrent.pageBefore) {
        vmGeriConnect.pushDown = true;
        var pageBeforeId = vmGeriConnect.pageCurrent.pageBefore.sys.id;
        $timeout(function() {
          ContentService.routeToEntry(pageBeforeId, true);
        }, 1000);
      }
    }

    function entriesUpdate() {
      $log.log('$state.params', $state.params);
      vmGeriConnect.pushDown = false;
      vmGeriConnect.pushUp = false;
      var entryId = $state.params.entryId;
      vmGeriConnect.isEntering = true;
      vmGeriConnect.isBackward = $state.params.isBackward;
      vmGeriConnect.pageCurrent = ContentService.getEntryById(entryId);
      vmGeriConnect.pageName = $state.params.pageName;
      vmGeriConnect.isNavFromFeatures = $state.params.isNavFromFeatures;
      if (!vmGeriConnect.pageCurrent) {
        return;
      }

      if (vmGeriConnect.pageName.indexOf('Assess') == -1) {
        $scope.$emit('updateNavBarActiveIndex', 0);
        $scope.$emit('updateLogo', 0);
      } else {
        $scope.$emit('updateNavBarActiveIndex', 1);
        $scope.$emit('updateLogo', 1);

      }

      if (vmGeriConnect.pageCurrent.forwardGif && !vmGeriConnect.isBackward) {
        vmGeriConnect.showGif = vmGeriConnect.pageCurrent.forwardGif.fields.file.url;
      }
      if (vmGeriConnect.pageCurrent.backwardGif && vmGeriConnect.isBackward) {
        vmGeriConnect.showGif = vmGeriConnect.pageCurrent.backwardGif.fields.file.url;
      }

      if (vmGeriConnect.isNavFromFeatures) {
        $scope.$emit('updateNavBarGif', vmGeriConnect.showGif, true);
      } else {
        $scope.$emit('updateNavBarGif', vmGeriConnect.showGif);
      }

      if (vmGeriConnect.isNavFromFeatures) {
        vmGeriConnect.isGifPlaying = false;
      } else {
        vmGeriConnect.isGifPlaying = true;
        $timeout(function() {
          vmGeriConnect.isGifPlaying = false;
        }, 1000);
      }
      //$log.log('GeriConnectController entry', vmGeriConnect.pageCurrent, vmGeriConnect.pageBefore, vmGeriConnect.pageAfter);
    }

    function getAnimationClass() {
      var animationClasses = {
        fadeOutDown: vmGeriConnect.pushDown,
        fadeOutUp: vmGeriConnect.pushUp,
        fadeInUp: vmGeriConnect.isGifPlaying && !vmGeriConnect.isBackward,
        fadeInDown: vmGeriConnect.isGifPlaying && vmGeriConnect.isBackward,
        bounce: vmGeriConnect.isBouncing,
        slideInRight: vmGeriConnect.isNavFromFeatures
      };
      return animationClasses;
    }

  }
})();