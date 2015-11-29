(function(){
	'use strict';

	angular.module('starter').controller('DashCtrl',DashCtrl);

	DashCtrl.$inject = ["$scope"];

	function DashCtrl($scope){

			var vm = this;

			activate();

			function activate(){
				console.log("Activate Function called on the Dashboard...");
				
				    $("div.bhoechie-tab-menu>div.list-group>a").click(function(e) {
				        e.preventDefault();
				        $(this).siblings('a.active').removeClass("active");
				        $(this).addClass("active");
				        var index = $(this).index();
				        $("div.bhoechie-tab>div.bhoechie-tab-content").removeClass("active");
				        $("div.bhoechie-tab>div.bhoechie-tab-content").eq(index).addClass("active");
				    });
				
			}
	}


})();