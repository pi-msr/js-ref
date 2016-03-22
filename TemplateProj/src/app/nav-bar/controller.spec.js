(function() {
  'use strict';

  describe('NavBarController', function() {

    var vmNavBar;
    var $scope, $state;
    var ContentService;

    beforeEach(module('compendium'));

    beforeEach(inject(function(_$controller_, _$rootScope_, _$state_, _ContentService_) {
      $scope = _$rootScope_.$new();
      $state = _$state_;
      vmNavBar = _$controller_('NavBarController', {
        $scope: $scope
      });
      ContentService = _ContentService_;
      ContentService.entries = [{
        fields: {
          "name": "Geri Menu",
          "backgroundImage": {
            "sys": {
              "id": "dummyid"
            }
          },
          "itemLinks": [{
            "name": "dummyName1",
            "bodyText": "dummyBodyText1",
            "sys": {
              "id": "dummyid1"
            },
            "screenTemplate": {
              "sys": {
                "id": "dummyscId1"
              }
            }
          }, {
            "name": "dummyName2",
            "bodyText": "dummyBodyText2",
            "sys": {
              "id": "dummyid2"
            },
            "screenTemplate": {
              "sys": {
                "id": "dummyscId2"
              }
            }
          }, {
            "name": "dummyName2",
            "bodyText": "dummyBodyText3",
            "sys": {
              "id": "dummyid3"
            },
            "screenTemplate": {
              "sys": {
                "id": "dummyscId3"
              }
            }
          }]
        }
      }];

    }));



    it('should have scope object', function() {
      expect(vmNavBar).toEqual(jasmine.any(Object));
    });

    it('navBarUpdate has pageName Geri', function() {
      $state.params.pageName = 'Geri';
      spyOn(vmNavBar, 'navbarUpdate').and.callThrough();
      vmNavBar.navbarUpdate();
      expect(vmNavBar.navbarUpdate).toHaveBeenCalled();
    });

    it('navBarUpdate has pageName Gavi', function() {
      $state.params.pageName = 'Gavi';
      spyOn(vmNavBar, 'navbarUpdate').and.callThrough();
      vmNavBar.navbarUpdate();
      expect(vmNavBar.navbarUpdate).toHaveBeenCalled();
    });

    it('navBarUpdate has pageName Gems', function() {
      $state.params.pageName = 'Gems';
      spyOn(vmNavBar, 'navbarUpdate').and.callThrough();
      vmNavBar.navbarUpdate();
      expect(vmNavBar.navbarUpdate).toHaveBeenCalled();
    });

    it('navBarUpdate has pageName Eeva', function() {
      $state.params.pageName = 'Eeva';
      spyOn(vmNavBar, 'navbarUpdate').and.callThrough();
      vmNavBar.navbarUpdate();
      expect(vmNavBar.navbarUpdate).toHaveBeenCalled();
    });

    it('should have background Image', function() {
      $scope.$broadcast('updateNavBarBackground');
      expect(vmNavBar.backgroundUrl).not.toEqual(null);
    });


  });
})();