(function() {
    'use strict';

    angular
        .module('compendium')
        .run(appRun);

    /* @ngInject */
    function appRun(RouterHelper) {
        RouterHelper.configureStates(getStates());
    }

    function getStates() {
        return [{
            state: 'terms',
            config: {
                url: '/',
                templateUrl: 'app/terms-of-use/template.html',
                controller: 'TermsController',
                controllerAs: 'vmTerms'
            }
        }];
    }
})();