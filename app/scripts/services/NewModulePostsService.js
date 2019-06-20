'use strict';

/**
 * @ngdoc function
 * @name angularJsAppApp.service:PostsService
 * @description
 * # PostsService
 * Service of the angularJsAppApp
 */
angular.module('newModule', [])
.config(function($qProvider) {
    $qProvider.errorOnUnhandledRejections(false);
})
.service('NewModulePostsService', function($http) {
    var POSTS_RESOURCE = "https://jsonplaceholder.typicode.com/posts";
    return {
        returnPost: function(postId) {
            return $http.get(POSTS_RESOURCE + "/" + postId)
                .then(function(res) {
                    return res.data;
                })
                .catch(function(res) {
                    return res.data;
                });
        }
    }
});