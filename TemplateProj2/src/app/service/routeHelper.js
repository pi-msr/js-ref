(function() {
    'use strict';

    angular
        .module('ipa')
        .provider('routerHelper', routerHelperProvider);

    /* @ngInject */
    function routerHelperProvider($locationProvider, $stateProvider, $urlRouterProvider) {
        /* jshint validthis:true */
        this.$get = RouterHelper;

    
        RouterHelper.$inject = ['$state'];

        /* @ngInject */
        function RouterHelper($state) {
            var hasOtherwise = false;

            var service = {
                configureStates: configureStates,
                getStates: getStates
            };

            return service;

            ///////////////

            function configureStates(states, otherwisePath) {

                //populate the state provider with all application states
                states.forEach(function(state) {                  
                    $stateProvider.state(state.state, state.config);
                });

                //if the otherwise path is specified do the navigation
                if (otherwisePath && !hasOtherwise) {
                    hasOtherwise = true;
                    $urlRouterProvider.otherwise(otherwisePath);
                }
            }

            function getStates() {
                return $state.get();
            }
        }
    }
})();
