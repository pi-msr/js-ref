(function() {
  'use strict';

  describe('PdfViewerController', function() {

    var vmPdfViewer;
    var $scope, $state;
    beforeEach(module('compendium'));

    beforeEach(inject(function(_$controller_, _$rootScope_,_$state_) {
      $scope = _$rootScope_.$new();
      $state = _$state_;
      vmPdfViewer = _$controller_('PdfViewerController', {
        $scope: $scope
      });
    }));

    it('should have scope object', function() {
      expect(vmPdfViewer).toEqual(jasmine.any(Object));
    });

    it('should properly update assets', function() {
      $state.params.assetId = "dummyAssetId";
      vmPdfViewer.assetsUpdate();
    });

    it('should navigate back on back button click',function(){
       vmPdfViewer.back();
    });
  });
})();