(function () {

'use strict';
angular.module('LunchCheck', [])

.controller('LunchCheckController', LunchCheckController);
LunchCheckController.$inject = [$scope]; // protects against minification
function LunchCheckController($scope) {
	$scope.text = "";
	$scope.check = function () {
		if($scope.text.trim() != "") {
			$scope.messageStyle = { 'color': 'green'};
			if($scope.text.split(",").length < 4) {
				$scope.message = "Enjoy!";
			} else {
				$scope.message = "Too much!";
			}
		} else{
			$scope.messageStyle = {'color': 'red'};
			$scope.message = "Please enter data first";
		}
	};

};

})();