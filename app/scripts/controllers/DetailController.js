'use strict';

/**
 * @ngdoc function
 * @name angularJsAppApp.controller:DetailController
 * @description
 * # DetailController
 * Controller of the angularJsAppApp
 */
angular.module('angularJsAppApp').controller('DetailController', function ($scope, $stateParams) {
    $scope.detail = "detail";
    $scope.params = $stateParams;

    console.log($scope.params)
  });
