(function() {
    'use strict';

    angular
        .module('ipa')
        .factory("ipaApi", ipaApi);

        /* @ngInject */
        function ipaApi() {

            var ipaApi = {};
          
            return ipaApi;
        }
})();