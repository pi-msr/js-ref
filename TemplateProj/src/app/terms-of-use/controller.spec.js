(function() {
  'use strict';

  describe('TermsController', function() {

    var Terms;
    var $scope;
    var ContentService;
    beforeEach(module('compendium'));

    beforeEach(inject(function(_$controller_, _$rootScope_,_ContentService_) {
      $scope = _$rootScope_.$new();
      Terms = _$controller_('TermsController', {
        $scope: $scope
      });
      ContentService = _ContentService_;
      ContentService.entries = [{
        "fields": {
          "name": "Terms Of Use",
          "logo": {
            "fields":{
              "file":"dummyLogoFileUrl"
            }
          },
          "buttonInactive":{
            "fields":{
              "file":{
                "url":"dummyButtonInactieimageUrl"
              }
            }
          },
          "checkboxOn":{
            "fields":{
              "file":{
                "url":"dummyCheckBoxOffFileUrl"
              }
            }
          },
          "checkboxOff":{
            "fields":{
              "file":{
                "url":"dummyCheckBoxOnFileUrl"
              }
            }
          }
        }
      }];

    }));

    it('should have scope object', function() {
      expect(Terms).toEqual(jasmine.any(Object));
    });

    it('should have entry object', function() {
      Terms.entriesUpdate();
      expect(Terms.entry).toEqual(jasmine.any(Object));
    });

  });
})();