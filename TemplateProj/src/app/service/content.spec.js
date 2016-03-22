(function() {
  'use strict';

  describe('ContentService ', function() {
    var ContentService;
    var $httpBackend;
    var isOfflineMode;

    beforeEach(module('compendium'));
    beforeEach(inject(function(_ContentService_, _$httpBackend_) {
      ContentService = _ContentService_;
      $httpBackend = _$httpBackend_;

      $httpBackend.when('GET', 'assets/json/entries.json')
        .respond(200, {
          items: []
        });
      $httpBackend.when('GET', 'assets/json/assets.json')
        .respond(200, {
          items: []
        });

        if(ContentService.offlineContent){
          isOfflineMode = ContentService.offlineContent;
        }

    }));


    it('should be registered', function() {
      expect(ContentService).not.toEqual(null);
    });

    it('Init should exist', function() {
      expect(ContentService.init).not.toEqual(null);
    });

    describe('Init live Content', function() {

      beforeEach(function() {
       ContentService.offlineContent = false;
      });


      it('should load json', function() {
        if(!isOfflineMode){ //only run spec on online mode
          $httpBackend.when('GET', 'assets/json/contentful.json').respond(404, 'no json file');
          ContentService.init();
          $httpBackend.flush();
        }
      });


      it('should call loadEntries', function() {
        if(!isOfflineMode){ //only run spec on online mode    
          var customOptions = {
            "preview": {
              "host": "preview.contentful.com",
              "accessToken": "dummyAccessToken"
            },
            "production": {
              "host": "cdn.contentful.com",
              "accessToken": "dummyAccessToken"
            },
            "spaceId": "dummySpace"
          };
          $httpBackend.when('GET', 'assets/json/contentful.json').respond(customOptions);

          $httpBackend.when('GET', 'https://cdn.contentful.com:443/spaces/dummySpace/entries?access_token=dummyAccessToken&limit=1000')
            .respond(200, {
              items: []
            });

          $httpBackend.when('GET', 'https://cdn.contentful.com:443/spaces/dummySpace/assets?access_token=dummyAccessToken&limit=1000')
            .respond(200, {
              items: []
            });

          ContentService.init();
          $httpBackend.flush();
        }
      });
    });

    describe('getEntryByName ', function() {
      it('should exist', function() {
        expect(ContentService.getEntryByName).not.toEqual(null);
      });

      it('should filter by fields name', function() {
        ContentService.entries = [{
          fields: {
            name: 'someTitle22'
          }
        }, {
          fields: {
            name: 'someTitle2'
          }
        }];
        expect(ContentService.getEntryByName('someTitle2').name).toEqual('someTitle2');
      });

      it('should filter by fields name when field name ends with a dash followed by number', function() {
        ContentService.entries = [
          {
            fields: {
              name: 'Eeva-Feature-1'
            }
          }, 
          {
            fields: {
              name: 'Eeva-Feature-11'
            }
          }
        ];
        expect(ContentService.getEntryByName('Eeva-Feature-1').name).toEqual('Eeva-Feature-1');
      });

      it('should return empty object if not found', function() {
        ContentService.entries = [];
        expect(ContentService.getEntryByName('someTitle2')).toEqual({});
      });

    });

    describe('getAssetsByPrefix',function(){

       it('should exist',function(){
        expect(ContentService.getAssetsByPrefix).not.toEqual(null);
      });

      it('shoudl filter by assets prefix',function(){
        ContentService.assets = [{
           fields: {
              title:'Prefix1AssetTitle1'
            }
           },{ fields : {
            title:'Prefix2AssetTitle2'
           }
        }];
        expect(ContentService.getAssetsByPrefix('Prefix2')[0].fields.title).toEqual('Prefix2AssetTitle2');

      });

      it('should return null object if not found', function() {
        ContentService.entries = [];
        expect(ContentService.getAssetsByPrefix('SomeAssetTitle2')).toEqual(null);
      });


    });

    describe('getAssetById',function(){

      it('should exist',function(){
        expect(ContentService.getAssetById).not.toEqual(null);
      });

      it('shoudl filter by assets Id',function(){
        ContentService.assets = [{
           sys: {
              id:'AssetId1'
            }
           },{ sys : {
            id:'AssetId2'
           }
        }];
        expect(ContentService.getAssetById('AssetId1').sys.id).toEqual('AssetId1');

      });

      it('should return empty object if not found', function() {
        ContentService.entries = [];
        expect(ContentService.getAssetById('AssetId2')).toEqual('');
      });

    });

    describe('getEntryById ', function() {
      it('should exist', function() {
        expect(ContentService.getEntryById).not.toEqual(null);
      });

      it('should filter by fields name', function() {
        ContentService.entries = [{
          sys: {
            id: 'dummyId1'
          },
          fields: {
            name: 'name1'
          }
        }];
        expect(ContentService.getEntryById('dummyId1').name).toEqual('name1');
      });

      it('should return empty object if not found', function() {
        ContentService.entries = [];
        expect(ContentService.getEntryById('dummyId1')).toEqual(null);
      });

    });

    describe('getAssetByTitle ', function() {
      it('should exist', function() {
        expect(ContentService.getAssetByTitle).not.toEqual(null);
      });

      it('should filter by fields title', function() {
        ContentService.assets = [{
          fields: {
            title: 'someTitle2'
          }
        }, {
          fields: {
            title: 'someTitle1'
          }
        }];
        expect(ContentService.getAssetByTitle('someTitle1').title).toEqual('someTitle1');
      });

      it('should return empty object if not found', function() {
        ContentService.assets = [];
        expect(ContentService.getAssetByTitle('someTitle2')).toEqual(null);
      });

    });



    describe('getAssetUrlById ', function() {
      beforeEach(function() {
        ContentService.assets = [{
          sys: {
            id: 'id2'
          },
          fields: {
            file: {
              url: '//url2'
            }
          }
        }, {
          sys: {
            id: 'id1'
          },
          fields: {
            file: {
              url: 'url1'
            }
          }
        }];
      });

      it('should exist', function() {
        expect(ContentService.getAssetUrlById).not.toEqual(null);
      });

      it('should filter by id', function() {
        expect(ContentService.getAssetUrlById('id1')).toEqual('url1');
      });


      it('should return empty string if not found', function() {
        ContentService.assets = [];
        expect(ContentService.getAssetUrlById('id2')).toEqual('');
      });

    });

    describe('prepareUrl ', function() {
      it('should exist', function() {
        expect(ContentService.prepareUrl).not.toEqual(null);
      });



      it('should add asset if offlineContent', function() {
        ContentService.offlineContent = false;
        expect(ContentService.prepareUrl('//url1')).toEqual('http://url1');

        ContentService.offlineContent = true;
        expect(ContentService.prepareUrl('//url2')).toEqual('assets/url2');
      });

    });

    describe('Route To Asset ', function() {
      it('should route to asset', function() {
       ContentService.routeToAsset("dummyAssetId");
      });

      it('should route to entry', function() {
        ContentService.routeToEntry("dummyEntryId");
      });

    });

  });
})();