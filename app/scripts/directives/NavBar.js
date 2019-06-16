'use strict';

/**
 * @ngdoc function
 * @name angularJsAppApp.directive:NavBar
 * @description
 * # NavBar
 * Directive of the angularJsAppApp
 */
angular.module('angularJsAppApp').directive('navBar', function($rootScope) {
    return {
        restrict: 'E',
        scope: false,
        link: function(scope) {
          scope.state = $rootScope.globalState.$current.name
        },
        template: 
          `  <nav class="blue lighten-2">
          <div class="nav-wrapper">
            <a href="#!" class="brand-logo">
              <img src="../images/smile.png" class="smileImg"/>
              <small>Resource Finder</small>
            </a>
            <a href="#" data-target="mobile-demo" ng-click="toggleMobileNav()" class="sidenav-trigger"><i class="material-icons">menu</i></a>
            <ul class="right hide-on-med-and-down">
              <li ng-class="{'active': (state === 'index')}"><a ui-sref="index">Home</a></li>
              <li><a ui-sref="">Login</a></li>
            </ul>
          </div>
        </nav>
      
        <ul class="sidenav" id="mobile-demo">
          <li><a ui-sref="index">Home</a></li>
          <li><a ui-sref="">Login</a></li>
        </ul>`
    }
})
