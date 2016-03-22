(function() {
  'use strict';

  angular
    .module('compendium')
    .controller('ViewerGridController', ViewerGridController);

  /** @ngInject */
  function ViewerGridController(
    $scope,
    $state,
    $ionicHistory,
    ContentService,
    $log,
    $http,
    uiGridConstants
  ) {
    var vmViewerGrid = this;
    vmViewerGrid.gridOptions = getGridOptions();
    vmViewerGrid.assetsUpdate = assetsUpdate;
    vmViewerGrid.back = back;
    vmViewerGrid.getDuplicatedData = getDuplicatedData;
    $scope.$on('assetsUpdate', assetsUpdate);
    $scope.$on('$stateChangeSuccess', assetsUpdate);

    function assetsUpdate() {
      $log.log('stateChangeSuccess');
      $http.get('assets/json/grid-sample.json').then(function(response) {
        angular.extend(vmViewerGrid.gridOptions, { data: response.data })
        getDuplicatedData(response.data);
      });
    }

    function getGridOptions() {
      var gridOptions = {
        enableSorting: true,
        enableColumnResizing: true,
        enableColumnMenus: false,
        enableFiltering: true,
        columnDefs: getColumnDefs()
      };
      return gridOptions;
    }

    function getColumnDefs() {
      var columnDefs = [
        // { name: "PatientName", width: 150 },
        // { name: "PatientID1", width: 150 },
        // { name: "PatientID2", width: 150 },
        // { name: "PatientDateOfBirth", width: 200 },
        // { name: "EstimatedTimeOfInsemination", width: 250 },
        // { name: "CycleType", width: 150 },
        {
          name: "WellNumber",
          width: 130,
          filter: {
            terms: 'well',
            condition: function(searchTerm, cellValue) {
              return searchTerm == cellValue;
            },
            type: uiGridConstants.filter.SELECT,
            selectOptions: wellOptions()
          }
        },
        //{ name: "TimeFromEstimatedInsemination (seconds)", width: 250 },
        { name: "Name", width: 260, enableFiltering: false },
        { name: "Score", width: 70, enableFiltering: false }, {
          name: "Type",
          width: 170,
          filter: {
            terms: 'type',
            type: uiGridConstants.filter.SELECT,
            selectOptions: typeOptions()
          }
        }, {
          name: "ChapterIndex",
          width: 140,
          filter: {
            terms: 'chapter',
            type: uiGridConstants.filter.SELECT,
            selectOptions: chapterOptions()
          }
        },
        { name: "ChapterTitle", width: 250, enableFiltering: false }
      ];

      return columnDefs;
    }

    function getDuplicatedData(data) {
      vmViewerGrid.duplicatedData = [];

      var duplicatedFields = ["PatientName",
        "PatientID1",
        "PatientID2",
        "PatientDateOfBirth",
        "EstimatedTimeOfInsemination",
        "CycleType"
      ];
      var firstData = data[0];
      angular.forEach(duplicatedFields, function(field) {

        vmViewerGrid.duplicatedData.push({
          'name': field,
          'value': firstData[field]
        });
      });

      return vmViewerGrid.duplicatedData;
    }

    function back() {
      $ionicHistory.goBack();
    }

    function wellOptions() {
      var options = [];
      for (var i = 1; i <= 16; i++) {
        options.push({ value: i, label: i });
      }
      return options;
    }

    function chapterOptions() {
      var options = [];
      for (var i = 1; i <= 6; i++) {
        options.push({ value: i, label: i });
      }
      return options;
    }

    function typeOptions() {
      var options = [];
      options.push({ value: 'observation', label: 'observation' });
      options.push({ value: 'event', label: 'event' });
      return options;
    }
  }
})();