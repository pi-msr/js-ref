(function() {
  'use strict';
  describe('GeriFeatureController', function() {

    var vmGeriFeature;
    var $scope;

    beforeEach(module('compendium'));

    beforeEach(inject(function(_$controller_, _$rootScope_) {
      $scope = _$rootScope_.$new();
      vmGeriFeature = _$controller_('GeriFeatureController', {
        $scope: $scope
      });
    }));

    it('should have scope object', function() {
      expect(vmGeriFeature).toEqual(jasmine.any(Object));
    });

    it('should have entry object', function() {
      vmGeriFeature.entriesUpdate();
      expect(vmGeriFeature.pageCurrent).toEqual(jasmine.any(Object));
    });

    it('should implement swipedown', function() {
      vmGeriFeature.pageCurrent = {
        pageBefore: {
          sys: {
            id: 'dummyId1'
          }
        }
      };
      vmGeriFeature.swipeDown();
    });

    it('should implement swipeup', function() {
      vmGeriFeature.pageCurrent = {
        pageAfter: {
          sys: {
            id: 'dummyId2'
          }
        }
      };
      vmGeriFeature.swipeUp();
    });

  });
})();