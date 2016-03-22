(function() {
  'use strict';

  angular
    .module('compendium')
    .controller('VideoController', VideoController);

  /** @ngInject */
  function VideoController($log, $sce, $scope, $state, $ionicHistory, $timeout, ContentService) {
    var vmVideo = this;
    vmVideo.assetsUpdate = assetsUpdate;
    vmVideo.video = null;
    vmVideo.goBack = $ionicHistory.goBack;
    vmVideo.onPlayerReady = onPlayerReady;

    $scope.$on('assetsUpdate', assetsUpdate);
    $scope.$on('$stateChangeSuccess', assetsUpdate);

    function assetsUpdate() {
      vmVideo.assetId = $state.params.assetId;
      vmVideo.asset = ContentService.getAssetById(vmVideo.assetId);
      vmVideo.url = vmVideo.asset ? vmVideo.asset.fields.file.url : '';
      vmVideo.config = getConfig();
    }

    function getConfig() {
      return {
        sources: [{
          src: $sce.trustAsResourceUrl(vmVideo.url),
          type: "video/mp4"
        }],
        plugins: {
          poster: "assets/images/video-poster.png"
        }
      };
    }

    function onPlayerReady(videogularApi) {
      $log.log('VideoController onPlayerReady', videogularApi);
      $timeout(function() {
        videogularApi.play();
      }, 1000);
    }
  }
})();