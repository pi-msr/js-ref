(function() {
  'use strict';

  describe('FertilityController', function() {

    var vmMain;
    var $scope, ContentService;
    beforeEach(module('compendium'));

    beforeEach(inject(function(_$controller_, _$rootScope_, _ContentService_) {
      $scope = _$rootScope_.$new();
      vmMain = _$controller_('FertilityController', {
        $scope: $scope
      });
      ContentService = _ContentService_;
      ContentService.entries = [{
        fields: {
          "name": "Fertility Overview Menu",
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
      expect(vmMain.entry.name).toEqual('Fertility Overview Menu');
    });

  });
})();