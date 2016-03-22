(function() {
    'use strict';

    angular
        .module('ipa')
        .run(appRun);

    /* @ngInject */
    function appRun(routerHelper) {
        routerHelper.configureStates(getStates());
    }

    function getStates() {
        return [{
            state: 'mainscreen',
            config: {
                url: "/mainscreen",
                templateUrl: 'app/components/main/template.html',
                controller: 'MainController',
                controllerAs: 'vm',
                cache:false                 
            }
        }];
    }
})();
