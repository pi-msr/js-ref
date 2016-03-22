(function() {
  'use strict';

  angular
    .module('compendium')
    .controller('TermsController', TermsController);

  /** @ngInject */
  function TermsController(
    $localStorage,
    $scope,
    $state,
    $timeout,
    ContentService,
    $filter,
    $log,
    $ionicPopup
  ) {
    var vmTerms = this;
    vmTerms.entry = {};
    vmTerms.entriesUpdate = entriesUpdate;
    vmTerms.agree = agree;
    vmTerms.isAgreed = false;
    vmTerms.isEntering = false;
    vmTerms.isExiting = false;
    vmTerms.proceed = proceed;
    vmTerms.getAnimationClass = getAnimationClass;
    vmTerms.changedCountry = changedCountry;

    $scope.$on('entriesUpdate', entriesUpdate);
    $scope.$on('$ionicView.enter', entriesUpdate);

    init();

    function init() {
      orderCountries();
      vmTerms.selectedCountry = 'en';
      //vmTerms.selectedCountry = vmTerms.selectItems[0].text;
    }

    function orderCountries() {
      vmTerms.selectItems = [{
        text: 'United Kingdom',
        value: 'en'
      }, {
        text: 'Germany',
        value: 'de'
      }, {
        text: 'Ireland',
        value: 'en'
      }, {
        text: 'Canada',
        value: 'en'
      }];
      //Sort the countries array
      vmTerms.selectItems = $filter('orderBy')(vmTerms.selectItems, 'text');

      //assign Others at the bottom
      vmTerms.selectItems.push({ text: "Others", value: '' });
    }

    function entriesUpdate() {
      vmTerms.entry = ContentService.getEntryByName('Terms Of Use');
      getTranslations(vmTerms.selectedCountry);
      $timeout(function() {
        // //wait 3 seconds until animation finish.
        // if (!$localStorage.hasAgreed) {
        //   vmTerms.isEntering = true;
        // } else {
        //   vmTerms.isAgreed = true;
        //   proceed();
        // }
        vmTerms.isAgreed = true;
        proceed();
      }, 3000);
    }

    function changedCountry() {
      $log.log('Country', vmTerms.selectedCountry);
      getTranslations(vmTerms.selectedCountry);
      if (vmTerms.selectedCountry == "") {
        showNotSupportedAlert();
      }
    }

    function showNotSupportedAlert() {
      var alert = $ionicPopup.alert({
        title: 'Country Not Supported',
        cssClass: 'others-popup',
        template: 'The Merck Fertility Technologies are not yet available in your country.For further information, please email <a href="mailto:FT@merckgroup.com">FT@merckgroup.com</a>'
      });

      alert.then(function() { //reset the selection to 0
        vmTerms.selectedCountry = 'en';
      });
    }

    function agree() {
      vmTerms.isAgreed = !vmTerms.isAgreed;
    }

    function proceed() {
      if (vmTerms.isAgreed) { //wait 3 seconds until animation finish.
        vmTerms.isExiting = true;
        $localStorage.hasAgreed = true;
        $timeout(function() {
          $state.go('fertility');
        }, 1000);
      }
    }

    function getAnimationClass() {
      return {
        fadeInUp: vmTerms.isEntering,
        fadeOutUp: vmTerms.isExiting
      };
    }

    function getTranslations(locale) {
      if (locale == 'en') {
        vmTerms.translatedText = vmTerms.entry.longText;
      }

      if (locale == 'de') {
        vmTerms.translatedText = vmTerms.entry.longTextTranslation;
      }

      var agreeText = {
        'en': 'I agree to terms of use',
        'de': 'Ich stimme den Nutzungsbedingungen'
      };

      vmTerms.agreeText = agreeText[locale];
    }
  }
})();