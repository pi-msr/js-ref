(function() {
    'use strict';

    angular
        .module('ipa')
        .factory("appState", appState);

        /* @ngInject */
        function appState() {                   	

            var appState = {};

            appState.setConnectedDevice = function(device){
				appState.connectedDevice = device;
            }

            return appState;
        }
})();