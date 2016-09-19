(function () {
'use strict';

angular.module('ShoppingListCheckOff', [])
.controller('ToBuyShoppingController', ToBuyShoppingController)
.controller('AlreadyBoughtShoppingController', AlreadyBoughtShoppingController)
.service('ShoppingListCheckOffService', ShoppingListCheckOffService);

ToBuyShoppingController.$inject = ['ShoppingListCheckOffService'];
function ToBuyShoppingController(ShoppingListCheckOffService) {
	
	var list1 = this;

	list1.items = ShoppingListCheckOffService.toBuyItems;
	list1.bought = function (item, itemIndex) {
		ShoppingListCheckOffService.boughtItems.push(item);
		ShoppingListCheckOffService.toBuyItems.splice(itemIndex, 1);

	};
	


}

AlreadyBoughtShoppingController.$inject =['ShoppingListCheckOffService'];
function AlreadyBoughtShoppingController(ShoppingListCheckOffService) {

	var list2 = this;

	list2.items = ShoppingListCheckOffService.boughtItems;


}

function ShoppingListCheckOffService () {

	var service = this;
	
	service.toBuyItems = [
								{ name: "cookies", quantity: 10 },
							 	{ name: "cookies", quantity: 10 },
							 	{ name: "cookies", quantity: 10 },
							 	{ name: "cookies", quantity: 10 },
							 	{ name: "cookies", quantity: 10 }
							 ];

	service.boughtItems = [];

	
}

})();