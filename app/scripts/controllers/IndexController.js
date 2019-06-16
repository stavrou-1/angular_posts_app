'use strict';

/**
 * @ngdoc function
 * @name angularJsAppApp.controller:IndexController
 * @description
 * # IndexController
 * Controller of the angularJsAppApp
 */
angular.module('angularJsAppApp').controller('IndexController', 
    function ($scope, $stateParams, PostsService, $state) {
    $scope.indexContent = "Hello. I am index controller content.";
    $scope.params = $stateParams;
    $scope.sortType     = 'name'; // set the default sort type
    $scope.sortReverse  = false;  // set the default sort order
    $scope.searchPost   = '';     // set the default search/filter term
    $scope.loading = false;
    $scope.retrievePosts = function() {
      $scope.loading = true;
      PostsService.getPosts()
      .then(function(data) {
        console.log(data.plain());
        $scope.postCollection = data.plain();
        console.log($scope.postCollection.length)
        $scope.loading = false;
      })
      .catch(function(error) {
        console.log(error);
        $scope.loading = false;
      })
    }
    var init = function() {
      $scope.retrievePosts()
    }
    $scope.goToPost = function(post) {
      console.log(post);
      $state.go('index', {
        obj: post.id
      })
    }
    init();
});
