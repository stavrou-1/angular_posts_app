'use strict';

/**
 * @ngdoc function
 * @name angularJsAppApp.controller:IndexController
 * @description
 * # IndexController
 * Controller of the angularJsAppApp
 */
angular.module('angularJsAppApp').controller('IndexController', 
    function ($scope, PostsService, $state) {
    $scope.indexContent = "Hello. I am index controller content.";
    $scope.sortType     = 'albumId'; // set the default sort type
    $scope.sortReverse  = false;  // set the default sort order
    $scope.searchPost   = '';     // set the default search/filter term
    $scope.loading = false;
    $scope.done = false;
    $scope.formattedApiCollection = [];
    $scope.postCollection = [];
    $scope.retrievePosts = function() {
      $scope.loading = true;
      PostsService.getPosts()
      .then(function(data) {
        $scope.done = true;
        $scope.postCollection.push(data.plain());
        $scope.formattedApiCollection.push($scope.postCollection[0].splice(0, 50));
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
      console.log(post.id)
      $state.go('posts', {
        pid: post.id
      });
    }
    init();
});
