(function() {
  'use strict';

  angular
    .module('compendium')
    .controller('NavBarController', NavBarController);

  /** @ngInject */
  function NavBarController($log, $scope, $state, ContentService) {
    var vmNavBar = this;
    vmNavBar.navbarUpdate = navbarUpdate;
    vmNavBar.getAnimationClass = getAnimationClass;
    $scope.$on('$stateChangeSuccess', navbarUpdate);
    $scope.$on('navbarUpdate', navbarUpdate);
    $scope.$on('entriesUpdate', navbarUpdate);
    $scope.$on('updateNavBarActiveIndex', updateNavBarActiveIndex);
    $scope.$on('updateNavBarGif', updateNavBarGif);
    $scope.$on('updateLogo', updateLogo);

    function navbarUpdate() {
      updateNavButtons();
    }

    function updateNavBarActiveIndex(event, activeIndex) {
      vmNavBar.activeIndex = activeIndex;
    }

    function updateNavBarGif(event, gifUrl, isNavigatedFromFeatures) {
      vmNavBar.gifUrl = gifUrl;
      vmNavBar.isNavigatedFromFeatures = isNavigatedFromFeatures;
    }

    function updateNavButtons() {
      if ($state.params.pageName) {
        var pageName = $state.params.pageName;
        vmNavBar.navMenu = null;
        if (pageName.indexOf('Geri') != -1) {
          vmNavBar.navMenu = ContentService.getEntryByName('Geri Menu');
        }
        if (pageName.indexOf('Gavi') != -1) {
          vmNavBar.navMenu = ContentService.getEntryByName('Gavi Menu');
        }
        if (pageName.indexOf('Gems') != -1) {
          vmNavBar.navMenu = ContentService.getEntryByName('Gems Menu');
        }
        if (pageName.indexOf('Geri Connect') != -1) {
          vmNavBar.navMenu = ContentService.getEntryByName('Geri Connect Menu');
        }
        if (pageName.indexOf('Eeva') != -1) {
          vmNavBar.navMenu = ContentService.getEntryByName('Eeva Menu');
        }
      }
    }

    function getAnimationClass() {
      var animationClasses = {
        slideInRight: vmNavBar.isNavigatedFromFeatures
      };
      return animationClasses;
    }

    function updateLogo(event, index) {
      if (vmNavBar.navMenu && vmNavBar.navMenu.bodyLogos && vmNavBar.navMenu.bodyLogos.length) {
        vmNavBar.bodyLogo = vmNavBar.navMenu.bodyLogos[index];
      }
    }


  }
})();