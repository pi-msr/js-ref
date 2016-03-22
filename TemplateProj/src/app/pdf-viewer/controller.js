(function() {
  'use strict';

  angular
    .module('compendium')
    .controller('PdfViewerController', PdfViewerController);

  /** @ngInject */
  function PdfViewerController(
    $scope,
    $state,
    $ionicHistory,
    ContentService,
    $log,
    $ionicLoading
  ) {
    var vmPdfViewer = this;
    vmPdfViewer.assetsUpdate = assetsUpdate;
    vmPdfViewer.back = back;
    $scope.$on('assetsUpdate', assetsUpdate);
    $scope.$on('$stateChangeSuccess', assetsUpdate);

    function assetsUpdate() {
      vmPdfViewer.assetId = $state.params.assetId;
      vmPdfViewer.asset = ContentService.getAssetById(vmPdfViewer.assetId);
      vmPdfViewer.url = vmPdfViewer.asset ? vmPdfViewer.asset.fields.file.url : false;

      var pdfScope = {
        pdfUrl: vmPdfViewer.url,
        onError: onError,
        onLoad: onLoad,
        onProgress: onProgress
      };
      angular.extend($scope, pdfScope);
    }

    function back() {
      $ionicHistory.goBack();
    }

    $ionicLoading.show({
      content: 'Loading...',
      animation: 'fade-in',
      showBackdrop: true,
      maxWidth: 200,
      showDelay: 0
    });

    function onError(error) {
      $log.log(error);
    }

    function onLoad() {
      $ionicLoading.hide();
    }

    function onProgress(progress) {
      $log.log(progress);
    }

  }
})();