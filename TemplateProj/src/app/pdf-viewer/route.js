(function() {
  'use strict';

  angular
    .module('compendium')
    .run(appRun);

  /* @ngInject */
  function appRun(RouterHelper) {
    RouterHelper.configureStates(getStates());
  }

  function getStates() {
    return [{
      state: 'pdf-viewer',
      config: {
        url: '/pdf-viewer/{assetId}',
        templateUrl: 'app/pdf-viewer/template.html',
        controller: 'PdfViewerController',
        controllerAs: 'vmPdfViewer',
        params: {
          assetId: null
        }
      }
    }];
  }
})();