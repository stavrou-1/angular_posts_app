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
    var postCount = 50;
    $scope.params = $stateParams;
    $scope.sortType     = 'albumId'; // set the default sort type
    $scope.sortReverse  = false;  // set the default sort order
    $scope.searchPost   = '';     // set the default search/filter term
    $scope.loading = false;
    $scope.postCollection = [];
    $scope.lastArrayObject = undefined;
    $scope.originalCollection = {
      data: [], 
      prev: [],
      firstCollection: []
    };
    $scope.formattedApiCollection = [];
    $scope.retrievePosts = function() {
      $scope.loading = true;
      PostsService.getPosts()
      .then(function(data) {
        $scope.postCollection.push(data.plain());
        var first50 = $scope.postCollection[0].splice(0, postCount), col = [];
        $scope.originalCollection.firstCollection.push(first50);
        $scope.originalCollection.data.push(data.plain());
        col.push(first50);

        $scope.formattedApiCollection = col[0];
        $scope.loading = false;
      })
      .catch(function(error) {
        console.log(error);
        $scope.loading = false;
      })
    }
    $scope.loadPosts = function(postCount) {
      var newArray = $scope.postCollection[0].splice(postCount, 50), col = [];
      $scope.originalCollection.prev.push(newArray);
      $scope.formattedApiCollection = [];

      console.log(newArray);
      col.push(newArray);

      $scope.formattedApiCollection = col[0];
    }
    $scope.loadLastArray = function() {
      $scope.formattedApiCollection = [];
      var lastArrayObject = $scope.originalCollection.prev[$scope.originalCollection.prev.length - 2], col = [];
      $scope.originalCollection.prev.splice($scope.originalCollection.prev.length-1, $scope.originalCollection.prev.length+1);
      
      col.push(lastArrayObject);
      $scope.formattedApiCollection = col[0];


      console.log(col);
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
