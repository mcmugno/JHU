(function () {

  angular.module("lunchCheck",[])

  .controller('lunchController', function ($scope) {

    $scope.lunchesList = function(){
      var lunchDisplay = getLunchItemsResponse($scope.totalLunch);
      var stylize = getStyle(lunchDisplay);

      $scope.displayText = lunchDisplay;
      $scope.style = stylize;
    }

    function getLunchItemsResponse(lunchItems){

      if(lunchItems === ""){
        return "Please enter data first";
      }
      var lst = lunchItems.split(",");
      for(var i = lst.length - 1; i >= 0; i--) {
        if(lst[i] === "" || lst[i] === " " ) {
           lst.splice(i, 1);
        }
      }
      if(lst.length >= 4){

        return "Too Much!";
      }else {
        return "Enjoy!";
      }
    }

    function getStyle(response){
      if(response == "Please enter data first"){
        return "color:red;border-style: solid;border-color: red;";
      }else {
        return "color:green;border-style: solid;border-color: green;";
      }
    }

  });

})();
