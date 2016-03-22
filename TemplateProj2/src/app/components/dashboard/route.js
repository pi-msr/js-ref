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
            state: 'tab',
            config: {
                url: "/tab",
                abstract:true,                
                templateUrl: 'app/components/dashboard/template.html',
                controller: 'DashController',
                controllerAs: 'vm'
            }
        }];
    }
})();
