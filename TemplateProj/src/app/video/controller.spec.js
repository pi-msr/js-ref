(function() {
  'use strict';

  describe('VideoController', function() {

    var vmVideo;
    var $scope;
    beforeEach(module('compendium'));

    beforeEach(inject(function(_$controller_, _$rootScope_) {
      $scope = _$rootScope_.$new();
      vmVideo = _$controller_('VideoController', {
        $scope: $scope
      });



    }));

    it('should have scope object', function() {
      expect(vmVideo).toEqual(jasmine.any(Object));
    });

    it('should have entry object', function() {
      vmVideo.assetsUpdate();
      expect(vmVideo.asset).toEqual('');
    });


  });
})();