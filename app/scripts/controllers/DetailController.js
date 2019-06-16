'use strict';

/**
 * @ngdoc function
 * @name angularJsAppApp.controller:DetailController
 * @description
 * # DetailController
 * Controller of the angularJsAppApp
 */
angular.module('angularJsAppApp').controller('DetailController', 
  function ($scope, $stateParams, PostsService) {
    $scope.params = $stateParams;
    console.log("Resource id: " + $scope.params.pid);
    $scope.detail = "detail";
    $scope.formattedDetailCollection = [];
    $scope.getPostDetails = function(postId) {
      PostsService.getPost(postId)
      .then(function(data) {
        $scope.formattedDetailCollection.push(data.plain());
        console.log($scope.formattedDetailCollection);
      })
      .catch(function(error) {
        console.error(error);
      })
    }
    $scope.getPostDetails($scope.params.pid);
});
