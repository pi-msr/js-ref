(function() {
  'use strict';
  describe('DataController', function() {

    var vmData;
    var $scope;

    beforeEach(module('compendium'));

    beforeEach(inject(function(_$controller_, _$rootScope_) {
      $scope = _$rootScope_.$new();
      vmData = _$controller_('DataController', {
        $scope: $scope
      });
    }));

    it('should have scope object', function() {
      expect(vmData).toEqual(jasmine.any(Object));
    });

    it('should have entry object', function() {
      vmData.entriesUpdate();
      expect(vmData.pageCurrent).toEqual(jasmine.any(Object));
    });

    it('should implement swipedown', function() {
      vmData.pageCurrent = {
        pageBefore: {
          sys: {
            id: 'dummyId1'
          }
        }
      };
      vmData.swipeDown();
    });

    it('should implement swipeup', function() {
      vmData.pageCurrent = {
        pageAfter: {
          sys: {
            id: 'dummyId2'
          }
        }
      };
      vmData.swipeUp();
    });

  });
})();