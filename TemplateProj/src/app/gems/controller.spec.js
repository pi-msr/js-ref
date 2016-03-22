(function() {
  'use strict';
  describe('GemsController', function() {

    var vmGems;
    var $scope;

    beforeEach(module('compendium'));

    beforeEach(inject(function(_$controller_, _$rootScope_) {
      $scope = _$rootScope_.$new();
      vmGems = _$controller_('GemsController', {
        $scope: $scope
      });
    }));

    it('should have scope object', function() {
      expect(vmGems).toEqual(jasmine.any(Object));
    });

    it('should have entry object', function() {
      vmGems.entriesUpdate();
      expect(vmGems.pageCurrent).toEqual(jasmine.any(Object));
    });

    it('should implement swipedown', function() {
      vmGems.pageCurrent = {
        pageBefore: {
          sys: {
            id: 'dummyId1'
          }
        }
      };
      vmGems.swipeDown();
    });

    it('should implement swipeup', function() {
      vmGems.pageCurrent = {
        pageAfter: {
          sys: {
            id: 'dummyId2'
          }
        }
      };
      vmGems.swipeUp();
    });

  });
})();