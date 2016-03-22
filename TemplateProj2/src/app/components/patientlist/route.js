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
            state: 'tab.patientlist',
            config: {
                url: '/patientlist',             
                views:{
                    'tab-patientlist':{                      
                         templateUrl:'app/components/patientlist/template.html',
                         controller:'PatientListController',
                         controllerAs: 'vm'                      
                    }
                }
            }
        }];
    }
})();
