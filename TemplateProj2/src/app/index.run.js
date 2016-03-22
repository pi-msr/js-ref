(function() {
  'use strict';

  angular
    .module('ipa')
    .run(runBlock);

  /** @ngInject */
  function runBlock($document, $ionicPlatform, $location, $log, $window,$state) {
      $ionicPlatform.ready(function() {               
                // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
                // for form inputs)
                if ($window.cordova && $window.cordova.plugins.Keyboard) {
                    $window.cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
                }
                if ($window.StatusBar) {
                    $window.StatusBar.styleDefault();
                }

                $window.document.addEventListener("pause", function() {
                    $log.log("The application is moving to background");                  
                }, false);

                $window.document.addEventListener("deviceready", onDeviceReady, false);

                function onDeviceReady() {
                    $window.StatusBar.hide();
                }

                $window.document.addEventListener("resume", function() {
                    $log.log("The application is resuming from the background");
                    $state.go("mainscreen");
                }, false);


                /** Prototype functions used in the application */

                //remove duplicated from an object array
                Array.prototype.removeDuplicatesByKey = function(id){                                 
                    var output = [],keys = [];
                    for(var i=0;i<this.length;i++){
                      if(keys.indexOf(this[i][id]) === -1){
                        keys.push(this[i][id]);
                        output.push(this[i]);
                      }
                    }                   
                    return output;
                }


                $log.log("***************** NEW IPA EXECUTION *****************");
      });
  }

})();