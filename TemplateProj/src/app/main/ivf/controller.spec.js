(function() {
  'use strict';

  describe('IvfController', function() {

    var vmMain;
    var $scope, ContentService;
    beforeEach(module('compendium'));

    beforeEach(inject(function(_$controller_, _$rootScope_, _ContentService_) {
      $scope = _$rootScope_.$new();
      vmMain = _$controller_('IvfController', {
        $scope: $scope
      });
      ContentService = _ContentService_;
      ContentService.entries = [{
        fields: {
          "name": "IVF Overview Menu",
          "backgroundImage": {
            "sys": {
              "id": "dummyid"
            }
          }
        }
      }];
    }));

    it('should have scope object', function() {
      expect(vmMain).toEqual(jasmine.any(Object));
    });

    it('should have entry object', function() {
      vmMain.entriesUpdate();
      expect(vmMain.entry.name).toEqual('IVF Overview Menu');
    });

  });
})();