(function() {
    'use strict';

    angular
        .module('ipa')
        .controller('PatientListController',PatientListController);

         /* @ngInject */
        function PatientListController($log,$scope,$ionicPlatform) {
            var vm = this;
                vm.creationDate = 1449548491092;
            

            activate();

            function activate(){
                $log.debug("Patient List controller activated");
                vm.isDevice = !$ionicPlatform.is('browser');
            }
           

        }
})();
