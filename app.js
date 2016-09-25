(function () {
'use strict';

angular.module('ShoppingListCheckOff', [])
.controller('ToBuyShoppingController', ToBuyShoppingController)
.controller('AlreadyBoughtShoppingController', AlreadyBoughtShoppingController)
.service('ShoppingListCheckOffService',ShoppingListCheckOffService);

ToBuyShoppingController.$inject = ['ShoppingListCheckOffService'];
function ToBuyShoppingController(ShoppingListCheckOffService) {
  var checker = this;
  
  checker.items = ShoppingListCheckOffService.getToBuyItems();
 
  checker.checkOff = function(itemIndex) {
	try {
		ShoppingListCheckOffService.checkOff(itemIndex);  
	} catch (error) {
	  checker.errorMessage = error.message;
	}
  }
}

AlreadyBoughtShoppingController.$inject = ['ShoppingListCheckOffService'];
function AlreadyBoughtShoppingController(ShoppingListCheckOffService) {
  var bought = this;
  
  bought.displayEmpty = function () {
	  return bought.items.length === 0;
  }
  
  bought.items = ShoppingListCheckOffService.getBoughtItems();
}

function ShoppingListCheckOffService() {
  var service = this;
  
  // List of items to buy
  var toBuyList = [
  { name: "cookies", quantity: 11 },
  { name: "cups", quantity: 12 },
  { name: "apple", quantity: 13 },
  { name: "brushes", quantity: 14 },
  { name: "eggs", quantity: 15 }];

  // List of items bought
  var alreadyBoughtList = [];
  
  service.checkOff = function (itemIndex) {
	var item = {};
	// remove an item from toBuyList  
	item = toBuyList[itemIndex];
	toBuyList.splice(itemIndex, 1);
	// add an item to alreadyBoughtList
	alreadyBoughtList.push(item);
	// signal error if no more items to buy
	if (toBuyList.length === 0)
		throw new Error("No more items to buy");
  };
  
    service.getToBuyItems = function () {
      return toBuyList;
  };
    service.getBoughtItems = function () {
      return alreadyBoughtList;
  };  
}

})();