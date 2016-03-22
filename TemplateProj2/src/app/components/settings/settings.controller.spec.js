(function() {
  'use strict';

  describe('controllers', function(){
    var vm;    
  
    beforeEach(module('ipa'));
    beforeEach(inject(function(_$controller_) {   
      vm = _$controller_('SettingsController');
    }));

    it('should have a timestamp creation date', function() {
      expect(vm.creationDate).toEqual(jasmine.any(Number));
    });

   
  });
})();
