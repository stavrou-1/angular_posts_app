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
    'restangular'
  ])
  .run(function($rootScope, $location, $state, $stateParams) {
    $rootScope.globalState = $state;
    $rootScope.toggleMobileNav = function() {
      $('.sidenav').sidenav();
    }
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
        controller: 'IndexController as ctrl'
      })
      .state('posts', {
        name: 'detail',
        url: '/posts/:pid',
        templateUrl: './views/detail-view.html',
        controller: 'DetailController as ctrl'
      })
  }])
