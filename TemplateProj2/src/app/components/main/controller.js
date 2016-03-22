(function() {
    'use strict';

    angular
        .module('ipa')
        .controller('MainController',MainController);

         /* @ngInject */
        function MainController($log,$state) {
            var vm = this;

            vm.main = function(){
                $log.debug("<-- Navigating to the dashboard tabs screen ");
                $state.go('tab.patientlist'); //default tab patienlist
            }
           

        }
})();
