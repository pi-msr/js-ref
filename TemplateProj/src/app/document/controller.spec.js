(function() {
  'use strict';
  describe('DocumentController', function() {

    var vmDocument;
    var $scope;

    beforeEach(module('compendium'));

    beforeEach(inject(function(_$controller_, _$rootScope_) {
      $scope = _$rootScope_.$new();
      vmDocument = _$controller_('DocumentController', {
        $scope: $scope
      });
    }));

    it('should have scope object', function() {
      expect(vmDocument).toEqual(jasmine.any(Object));
    });

    it('should have entry object', function() {
      vmDocument.entriesUpdate();
      expect(vmDocument.pageCurrent).toEqual(jasmine.any(Object));
    });

    it('should implement swipedown', function() {
      vmDocument.pageCurrent = {
        pageBefore: {
          sys: {
            id: 'dummyId1'
          }
        }
      };
      vmDocument.swipeDown();
    });

    it('should implement swipeup', function() {
      vmDocument.pageCurrent = {
        pageAfter: {
          sys: {
            id: 'dummyId2'
          }
        }
      };
      vmDocument.swipeUp();
    });

  });
})();