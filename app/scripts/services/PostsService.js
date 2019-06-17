'use strict';

/**
 * @ngdoc function
 * @name angularJsAppApp.service:PostsService
 * @description
 * # PostsService
 * Service of the angularJsAppApp
 */
angular.module('angularJsAppApp').service('PostsService', function(Restangular,$http) {
    var PHOTOS_RESOURCE = "photos";
    return {
        getPosts: function() {
            return Restangular.all(PHOTOS_RESOURCE).getList();
        },
        getPost: function(id) {
            return Restangular.one(PHOTOS_RESOURCE, id).get();
        }
    }
});