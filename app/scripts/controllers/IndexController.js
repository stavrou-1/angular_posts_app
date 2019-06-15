'use strict';

/**
 * @ngdoc function
 * @name angularJsAppApp.controller:IndexController
 * @description
 * # IndexController
 * Controller of the angularJsAppApp
 */
angular.module('angularJsAppApp').controller('IndexController', function ($scope, $stateParams) {
    $scope.indexContent = "Hello. I am index controller content.";
    $scope.params = $stateParams;
});
