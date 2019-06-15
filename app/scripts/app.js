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
  .module('angularJsAppApp', ['ui.router'])
  .run(function() {
    console.log('ran');
  })
  .config(['$stateProvider', '$urlRouterProvider', '$locationProvider', 
    function($stateProvider, $urlRouterProvider, $locationProvider) {
    $urlRouterProvider.otherwise("/");
    $stateProvider
      .state('index', {
        name: 'index',
        url: '/',
        templateUrl: './views/index-view.html',
        controller: 'IndexController as ctrl'
      })
      .state('index:did', {
        name: 'detail',
        url: '/:did',
        templateUrl: './views/detail-view.html',
        controller: 'DetailController as ctrl'
      })
  }])
