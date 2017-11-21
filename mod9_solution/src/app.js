(function () {
'use strict';

angular.module('NarrowItDownApp', [])
.controller('NarrowItDownController', NarrowItDownController)
.service('MenuSearchService', MenuSearchService)
.directive('foundItems', FoundItemsDirective)
.constant('ApiBasePath', "https://davids-restaurant.herokuapp.com");

//Directive
function FoundItemsDirective() {
  var ddo = {
    templateUrl: 'loader/itemsloaderindicator.template.html',
    scope: {
      narrowedMenu: '<',
      onRemove: '&'
    },
    controller: FoundItemsDirectiveController,
    controllerAs: 'foundItemsCtrl',
    bindToController: true
  };

  return ddo;
}

function FoundItemsDirectiveController() {
  var foundItemsCtrl = this;
}

//Controller
NarrowItDownController.$inject = ['MenuSearchService'];
function NarrowItDownController(MenuSearchService) {

  var narrowCtrl = this;
  narrowCtrl.searchTerm = '';
  narrowCtrl.isHidden = true;

  narrowCtrl.getFilteredItems = function () {
      narrowCtrl.found = [];
      if (narrowCtrl.query == undefined || narrowCtrl.query.length == 0) {
          narrowCtrl.isHidden = false;
      }
      else {
        var promise = MenuSearchService.getMatchedMenuItems(narrowCtrl.query);

    promise.then(function (response) {
        narrowCtrl.found = response;
        narrowCtrl.isHidden = narrowCtrl.found.length != 0 ? true : false;
    });
  }
  }

  narrowCtrl.removeItem = function (itemIndex) {
            MenuSearchService.removeItem(itemIndex, narrowCtrl.found);
        };
}


//Service
MenuSearchService.$inject = ['$http', 'ApiBasePath'];
function MenuSearchService($http, ApiBasePath) {
  var service = this;

  service.getMatchedMenuItems = function (searchTerm) {

    return $http({
      method: "GET",
      url: (ApiBasePath + "/menu_items.json"),
    }).then(function (result) {
      // process result and only keep items that match
      var foundItems = [];
      var menuItems = result.data.menu_items;

      //add all matching menu items into foundItems array
      angular.forEach(menuItems, function (item, itemIndex) {
          if (item.description.indexOf(searchTerm) !== -1) {
              foundItems.push(item);
          }
      });
      // return processed items
      return foundItems;
    });
  };
  service.removeItem = function (itemIndex, list) {
    list.splice(itemIndex, 1);
  }
}

})();
