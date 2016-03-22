(function() {
  'use strict';
  describe('GeriConnectController', function() {

    var vmGeriConnect;
    var $scope;

    beforeEach(module('compendium'));

    beforeEach(inject(function(_$controller_, _$rootScope_) {
      $scope = _$rootScope_.$new();
      vmGeriConnect = _$controller_('GeriConnectController', {
        $scope: $scope
      });
    }));

    it('should have scope object', function() {
      expect(vmGeriConnect).toEqual(jasmine.any(Object));
    });

    it('should have entry object', function() {
      vmGeriConnect.entriesUpdate();
      expect(vmGeriConnect.pageCurrent).toEqual(jasmine.any(Object));
    });

    it('should implement swipedown', function() {
      vmGeriConnect.pageCurrent = {
        pageBefore: {
          sys: {
            id: 'dummyId1'
          }
        }
      };
      vmGeriConnect.swipeDown();
    });

    it('should implement swipeup', function() {
      vmGeriConnect.pageCurrent = {
        pageAfter: {
          sys: {
            id: 'dummyId2'
          }
        }
      };
      vmGeriConnect.swipeUp();
    });

  });
})();