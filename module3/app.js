(function() {
	'use strict';

	angular.module('NarrowItDown', [])
	.controller('NarrowItDownController', NarrowItDownController)
	.service('MenuSearchService', MenuSearchService)
	.constant('ApiBasePath', "https://davids-restaurant.herokuapp.com")
	.directive('foundItems', FoundItemsDirective);

	function FoundItemsDirective () {
		var ddo = {
			templateUrl: 'foundItems.html',
			scope: {
				found: '<',
				onRemove: '&'
			},
			controller: FoundItemsDirectiveController,
			controllerAs: 'ctrl',
			bindToController: true
		};
		return ddo;
	}

	function FoundItemsDirectiveController() {
		
	}

	NarrowItDownController.$inject = ['MenuSearchService'];
	function NarrowItDownController(MenuSearchService) {
		
		var narrowItDown = this;
		narrowItDown.searchTerm = '';
		narrowItDown.nothingFound = '';

		narrowItDown.narrowIt = function() {
			

			if (narrowItDown.input) {
				narrowItDown.found = MenuSearchService.getMatchedMenuItems(narrowItDown.input);
				narrowItDown.found.then(function (response) {
					narrowItDown.found = response;
					narrowItDown.nothingFound = '';
				}).catch(function (error) {

				});
			
			} else {
				
				narrowItDown.found = [];
				narrowItDown.nothingFound = 'Nothing found';
			}
		};

		narrowItDown.removeItem = function(index) {
			narrowItDown.found.splice(index,1);
		}
	}

	MenuSearchService.$inject = ['$http', 'ApiBasePath'];
	function MenuSearchService($http, ApiBasePath) {

		var service = this;

		service.getMatchedMenuItems = function(searchTerm) {
			return $http({
					method: "GET",
					url: (ApiBasePath + "/menu_items.json")
			}).then(function(response) {
					var items = response.data.menu_items;
					var foundItems = [];

					for(var i = 0; i < items.length; i++) {
						var item = items[i]
						if (item.description.toLowerCase().indexOf(searchTerm) !== -1) {
							foundItems.push(item);
						}
					}
					return foundItems;
			})
			.catch(function(error) {
				return [];
			});
		};

	}

})();