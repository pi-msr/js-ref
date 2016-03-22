(function() {
  'use strict';

  angular
    .module('compendium')
    .directive('imgGif', imgGif);


  /* @ngInject */
  function imgGif() {
    // Usage:
    // Add a timestamp to the end of gif url, so the gif will play every time when loaded.
    // example <img-gif ng-src="{{image-url}}" >
    // Creates:
    //
    var directive = {
      restrict: 'E',
      replace: true,
      scope: {
        'ngSrc': '@'
      },
      template: '<img />',
      link: Link
    };
    return directive;

  }

  /* @ngInject */
  function Link(scope, element) {
    var timestamp = '#?timestamp=' + (new Date()).getTime() + '.gif';
    element.src = scope.ngSrc + timestamp;
  }

})();