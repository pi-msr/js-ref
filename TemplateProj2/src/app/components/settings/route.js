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
            state: 'tab.settings',
            config: {
                url: '/settings',             
                views:{
                    'tab-settings':{                      
                         templateUrl:'app/components/settings/template.html',
                         controller:'SettingsController',
                         controllerAs: 'vm'                      
                    }
                }
            }
        }];
    }
})();
