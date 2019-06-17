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
    $scope.loading = false;
    $scope.formattedDetailCollection = [];
    $scope.getPostDetails = function(postId) {
      $scope.loading = true;
      PostsService.getPost(postId)
      .then(function(data) {
        $scope.formattedDetailCollection.push(data.plain());
        console.log($scope.formattedDetailCollection);
        $scope.loading = false;
      })
      .catch(function(error) {
        console.error(error);
        $scope.loading = false;
      })
    }
    $scope.getPostDetails($scope.params.pid);
});
