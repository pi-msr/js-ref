(function() {
  'use strict';

  describe('ViewerGridController', function() {

    var vmViewerGrid;
    var $scope, $state;
    beforeEach(module('compendium'));

    beforeEach(inject(function(_$controller_, _$rootScope_, _$state_) {
      $scope = _$rootScope_.$new();
      $state = _$state_;
      vmViewerGrid = _$controller_('ViewerGridController', {
        $scope: $scope
      });
    }));

    it('should have scope object', function() {
      expect(vmViewerGrid).toEqual(jasmine.any(Object));
    });

    it('should properly update assets', function() {
      $state.params.assetId = "dummyAssetId";
      vmViewerGrid.assetsUpdate();
    });

    it('should navigate back on back button click', function() {
      vmViewerGrid.back();
    });
  });
})();