(function () {
'use strict';

angular.module('ShoppingListApp', [])
.controller('ToBuyController', ToBuyController)
.controller('AlreadyBoughtController', AlreadyBoughtController)
.service('ShoppingListCheckOffService', ShoppingListCheckOffService);

ToBuyController.$inject = ['ShoppingListCheckOffService'];
function ToBuyController(ShoppingListCheckOffService) {

  var buyList = this;
  buyList.shoppingList = ShoppingListCheckOffService.getToBuyItems();

  buyList.bought = function (itemIndex) {
    ShoppingListCheckOffService.addItemToBoughtList(itemIndex);
  };

}

AlreadyBoughtController.$inject = ['ShoppingListCheckOffService'];
function AlreadyBoughtController(ShoppingListCheckOffService) {

  var boughtList = this;
  boughtList.shoppingList = ShoppingListCheckOffService.getBoughtItems();

}

//Service

function ShoppingListCheckOffService() {
  var service = this;

  // List of shopping items
  var toBuyItems = [{
    name: "Chips",
    quantity: "4",
    pricePerItem: "2.99"
  },
  {
    name: "Donuts",
    quantity: "12",
    pricePerItem: ".89"
  },
  {
    name: "Cookies",
    quantity: "24",
    pricePerItem: "3.49"
  },
  {
    name: "Chocolate bars",
    quantity: "5",
    pricePerItem: ".99"
  }];
  var boughtItems = [];

  service.addItemToBoughtList = function (index) {
    boughtItems.push(toBuyItems[index]);
    toBuyItems.splice(index, 1);
  };

  service.getToBuyItems = function () {
    return toBuyItems;
  };

  service.getBoughtItems = function () {
    return boughtItems;
  };
}

})();
