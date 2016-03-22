(function() {
  'use strict';

  describe('MainController', function() {

    var vmMain;
    var $scope, ContentService;
    beforeEach(module('compendium'));

    beforeEach(inject(function(_$controller_, _$rootScope_, _ContentService_) {
      $scope = _$rootScope_.$new();
      vmMain = _$controller_('MainController', {
        $scope: $scope
      });
      ContentService = _ContentService_;
      ContentService.entries = [{
        fields: {
          "name": "MainMenu",
          "backgroundImage": {
            "sys": {
              "id": "dummyid"
            }
          },
          "itemLinks": [
                        {
                          "name":"dummyName1",
                          "bodyText":"dummyBodyText1",
                          "sys": {
                            "id":"dummyid1"
                          },
                          "screenTemplate":{
                              "sys": {
                                "id":"dummyscId1"
                              }
                          }  
                        },
                        {
                          "name":"dummyName2",
                          "bodyText":"dummyBodyText2",
                          "sys": {
                            "id":"dummyid2"
                          },
                          "screenTemplate":{
                             "sys": {
                                "id":"dummyscId2"
                              }
                          }      
                        },
                        {
                          "name":"dummyName2",
                          "bodyText":"dummyBodyText3",
                          "sys": {
                            "id":"dummyid3"
                          },
                          "screenTemplate":{
                             "sys": {
                                "id":"dummyscId3"
                              }
                          }      
                        }
          ]
        }
      }];
    }));

    it('should have scope object', function() {
      expect(vmMain).toEqual(jasmine.any(Object));
    });

    it('should have entry object', function() {
      vmMain.entriesUpdate();
      expect(vmMain.entry.name).toEqual('MainMenu');
    });

  });
})();