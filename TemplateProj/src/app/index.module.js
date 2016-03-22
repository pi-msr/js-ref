// Copyright (c) 2015, Planet Innovation
// 436 Elgar Road, Box Hill, 3128, VIC, Australia
// Phone: +61 3 9945 7510
// The copyright to the computer program(s) herein is the property of
// Planet Innovation, Australia.
// The program(s) may be used and/or copied only with the written permission
// of Planet Innovation or in accordance with the terms and conditions
// stipulated in the agreement/contract under which the program(s) have been
// supplied.
(function() {
  'use strict';

  angular
    .module('compendium', [

      /* Angular core */
      'ngAnimate',
      'ngCookies',
      'ngTouch',
      'ngSanitize',
      'router-helper',

      /* 3rd Party */
      'ngResource',
      'ui.router',
      'contentful',
      'ngStorage',

      /* UI */
      'hc.marked',
      'ionic',
      'ui.grid',

      /* video player */
      "com.2fdevs.videogular",
      "com.2fdevs.videogular.plugins.controls",
      "com.2fdevs.videogular.plugins.overlayplay",
      "com.2fdevs.videogular.plugins.poster",

      /* candle sim */
      'candle-sim',
      'geriSimApp',

      /* angularjs-pdf */
      'pdf'
    ]);

})();