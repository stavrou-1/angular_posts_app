'use strict';

/**
 * @ngdoc overview
 * @name angularJsAppApp
 * @description
 * # angularJsAppApp
 *
 * Main module of the application.
 */
angular
  .module('angularJsAppApp', [
    'ui.router', 
    'restangular',
    'newModule'
  ])
  .run(function($rootScope, $location, $state, $stateParams) {
    $rootScope.globalState = $state;
    $rootScope.toggleMobileNav = function() {
      $('.sidenav').sidenav();
    }
    $rootScope.$on('$stateChangeError', function(event) {
      $state.go('404');
    });
  })
  .config(['$stateProvider', '$urlRouterProvider', '$locationProvider', 'RestangularProvider',
    function($stateProvider, $urlRouterProvider, $locationProvider, RestangularProvider) {
    $urlRouterProvider.otherwise("/");
    RestangularProvider.setBaseUrl('https://jsonplaceholder.typicode.com');
    $stateProvider
      .state('index', {
        name: 'index',
        url: '/',
        templateUrl: './views/index-view.html',
        controller: 'IndexController'
      })
      .state('posts', {
        name: 'posts',
        url: '/posts/:pid',
        templateUrl: './views/detail-view.html',
        controller: 'DetailController'
      })
      .state('404', {
        name: '404',
        url: '/404',
        templateUrl: './views/404-view.html'
      })
  }])
