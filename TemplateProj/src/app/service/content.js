(function() {
  'use strict';

  angular
    .module('compendium')
    .factory('ContentService', ContentService);


  /* @ngInject */
  function ContentService($filter, $http, $log, $rootScope, $state, $window, contentful) {
    var service = {
      offlineContent: false,
      entries: [],
      assets: [],
      init: init,
      getEntryByName: getEntryByName,
      getEntryById: getEntryById,
      getAssetByTitle: getAssetByTitle,
      getAssetUrlById: getAssetUrlById,
      getAssetById: getAssetById,
      getAssetsByPrefix: getAssetsByPrefix,
      prepareUrl: prepareUrl,
      routeToAsset: routeToAsset,
      routeToEntry: routeToEntry,
      findLink: findLink,
      featureButtonClick: featureButtonClick
    };
    return service;

    ////////////////

    function init() {
      $http.get('assets/json/contentful.json').then(function(contentfulResponse) {
        service.offlineContent = contentfulResponse.data.offlineContent;
        if (contentfulResponse.data.offlineContent) {
          $http.get('assets/json/entries.json').then(function(response) {

            service.assets = response.data.includes.Asset;
            for (var i = 0; i < service.assets.length; i++) {
              service.assets[i].fields.file.url = prepareUrl(service.assets[i].fields.file.url);
            }

            service.entries = response.data.items;
            var linkedServiceEntries = [];
            response.data.items.forEach(function(entry) {
              var fieldsNames = Object.keys(entry.fields);
              fieldsNames.forEach(function(fieldName) {
                var field = entry.fields[fieldName];
                if (field && field.sys && (field.sys.type == 'Link')) {
                  // this is a link field
                  entry.fields[fieldName] = findLink(field);
                }

                if (angular.isArray(field) && field.length && field[0] && field[0].sys) {
                  // this is an array with link item
                  var linkItems = [];
                  field.forEach(function(linkItem) {
                    if (linkItem) {
                      linkItems.push(findLink(linkItem));
                    }
                  });
                  entry.fields[fieldName] = linkItems;
                }
              });
              linkedServiceEntries.push(entry);
            });

            service.entries = linkedServiceEntries;

            $rootScope.$broadcast('entriesUpdate');
          });
        } else {
          // offlineContent is false
          $log.log('contentfulResponse', contentfulResponse);
          var configData = contentfulResponse.data.production;

          var newOptions = {
            host: configData.host,
            space: contentfulResponse.data.spaceId,
            accessToken: configData.accessToken
          };

          angular.extend(contentful.options, newOptions);
          var queryString = '&limit=1000';

          contentful.entries(queryString).then(function(response) {

            if (response.status === 200) {
              service.entries = response.data.items;
            }
            $rootScope.$broadcast('entriesUpdate');
          });

          contentful.assets(queryString).then(function(response) {
            if (response.status === 200) {
              service.assets = response.data.items;
            }
            $rootScope.$broadcast('assetsUpdate');
          });

        }

      }, function(error) {
        $log.log('read contentful config data error', error);
      });
    }


    function getEntryByName(entryName) {
      var filterResult = $filter('filter')(service.entries, {
        fields: {
          name: entryName
        }
      }, true);

      if (filterResult.length > 0) {
        return filterResult[0].fields;
      } else {
        return {};
      }
    }

    function getEntryById(id) {
      if (!id) {
        return null
      }
      var filterResult = $filter('filter')(service.entries, {
        sys: {
          id: id
        }
      });

      if (filterResult.length > 0) {
        return filterResult[0].fields;
      } else {
        return null;
      }
    }

    function getEntryObjectById(id) {
      if (!id) {
        return null
      }
      var filterResult = $filter('filter')(service.entries, {
        sys: {
          id: id
        }
      });

      if (filterResult.length > 0) {
        return filterResult[0];
      } else {
        return null;
      }
    }

    function getAssetByTitle(title) {
      var filterResult = $filter('filter')(service.assets, {
        fields: {
          title: title
        }
      });

      if (filterResult.length > 0) {
        return filterResult[0].fields;
      } else {
        return null;
      }
    }

    function getAssetsByPrefix(prefix) {
      var filterResult = [];
      service.assets.forEach(function(el, i) {
        var actualPrefix = el.fields.title.slice(0, prefix.length);
        if (actualPrefix == prefix) {
          filterResult.push(service.assets[i]);
        }
      });
      if (filterResult.length > 0) {
        return filterResult;
      } else {
        return null;
      }
    }

    function getAssetUrlById(id) {
      var filterResult = $filter('filter')(service.assets, {
        sys: {
          id: id
        }
      });
      //$log.log('getAssetById', filterResult);
      if (filterResult.length > 0) {
        return filterResult[0].fields.file.url;
      } else {
        return '';
      }
    }

    function getAssetById(id) {
      var filterResult = $filter('filter')(service.assets, {
        sys: {
          id: id
        }
      });
      //$log.log('getAssetById', filterResult);
      if (filterResult.length > 0) {
        return filterResult[0];
      } else {
        return '';
      }
    }

    function prepareUrl(fileUrl) {
      if (service.offlineContent) {
        return fileUrl.replace('//', 'assets/');
      } else {
        return 'http:' + fileUrl;
      }
    }

    function routeToAsset(assetId) {
      var asset = getAssetById(assetId);
      if (asset && asset.fields.file) {
        $log.log('routeToAsset', asset);
        var contentType = asset.fields.file.contentType;

        if (contentType == 'video/mp4') {
          $state.go('video', {
            assetId: assetId
          });
        }

        if (contentType == 'application/pdf') {
          $state.go('pdf-viewer', {
            assetId: assetId
          });
        }
      }
    }

    function routeToEntry(entryId,isBackward,isNavFromFeatures) {
      var entry = getEntryById(entryId);
      $log.log('routeToEntry', entry);
      if (entry && entry.screenTemplate.fields && entry.screenTemplate.fields.routeState) {
        $state.go(entry.screenTemplate.fields.routeState, {
          entryId: entryId,
          pageName: entry.name,
          isBackward: isBackward ? isBackward : false,
          isNavFromFeatures: isNavFromFeatures ? isNavFromFeatures : false
        });
      } else {
        $log.log('Can not routeToEntry');
      }
    }

    function findLink(linkField) {
      if (linkField.sys.type == 'Link') {
        if (linkField.sys.linkType == 'Entry') {
          return getEntryObjectById(linkField.sys.id);
        }
        if (linkField.sys.linkType == 'Asset') {
          return getAssetById(linkField.sys.id);
        }
      }
    }

    function featureButtonClick(featureButton,isNavFromFeatures) {     
      if (featureButton.fields.linkEntry) {
        var entryId = featureButton.fields.linkEntry.sys.id;
        if(isNavFromFeatures){
           routeToEntry(entryId,false,true);
        }
        else{
           routeToEntry(entryId);
         }       
        return;
      }
      if (featureButton.fields.linkAsset) {
        var assetId = featureButton.fields.linkAsset.sys.id;
        routeToAsset(assetId);
        return;
      }
      if (featureButton.fields.linkOtherApp) {
        //var appId = featureButton.fields.linkOtherApp.appId;
        var urlSchemes = featureButton.fields.linkOtherApp.urlSchemes;
        //$log.log(featureButton);
        $window.open(urlSchemes + '://', '_system', 'location=yes');
      }
    }
  }
})();