(function() {
  'use strict';
  describe('directive imgGif', function() {

    var scope, element;
    var $httpBackend, compile;

    beforeEach(function() {
      module('compendium');
      inject(function(_$rootScope_, $compile) {
        scope = _$rootScope_.$new();
        compile = $compile;
        element = angular.element('<img-gif ng-src="{{imgUrl}}"/>');
        scope.imgUrl = "dummyImageUrl";
        element = compile(element)(scope);
      })
    });

    beforeEach(inject(function($injector) {
      $httpBackend = $injector.get('$httpBackend');
      $httpBackend.whenGET('assets/json/contentful.json').respond(200, '');
      scope.$digest();
    }));

    it('should be compiled', function() {
      expect(element.html()).not.toEqual(null);
    });

    it('should have the proper image url', function() {
      expect(element[0].getAttribute("src")).toEqual("dummyImageUrl");
    });

  });
})();