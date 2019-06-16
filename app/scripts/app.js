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
  .run(function() {
    console.log('ran');
    $(document).ready(function(){
      $('.sidenav').sidenav();
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
        controller: 'IndexController as ctrl'
      })
      .state('index:obj', {
        name: 'detail',
        url: '/:obj',
        params: {
          obj: null
        },
        templateUrl: './views/detail-view.html',
        controller: 'DetailController as ctrl'
      })
  }])
