'use strict';

/**
 * @ngdoc function
 * @name angularJsAppApp.service:PostsService
 * @description
 * # PostsService
 * Service of the angularJsAppApp
 */
angular.module('angularJsAppApp').service('PostsService', function(Restangular) {
    return {
        getPosts: function() {
            return Restangular.all('posts').getList();
        },
        getPost: function(id) {
            return Restangular.one('posts', id);
        }
    }
});