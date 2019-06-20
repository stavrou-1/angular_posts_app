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
'use strict';

/**
 * @ngdoc function
 * @name angularJsAppApp.service:PostsService
 * @description
 * # PostsService
 * Service of the angularJsAppApp
 */
angular.module('angularJsAppApp').service('PostsService', function(Restangular, $http, $q) {
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
          scope.state = $rootScope.globalState.$current.name;
          scope.indexString = "index";
        },
        template: 
          ' <nav class="blue lighten-2"> ' +
          ' <div class="nav-wrapper"> ' +
          '    <a href="#!" class="brand-logo">' +
          '      <img src="../images/smile.png" class="smileImg"/>' +
          '      <small>Resource Finder</small>' +
          '    </a>' +
          '    <a href="#" data-target="mobile-demo" ng-click="toggleMobileNav()" class="sidenav-trigger"><i class="material-icons">menu</i></a>' +
          '    <ul class="right hide-on-med-and-down">' +
          '      <li ng-class="{active: (state === indexString)}">' +
          '       <a ui-sref="index">Home</a>' +
          '      </li>' +
          '      <li><a ui-sref="">Login</a></li>' +
          '    </ul>' +
          '    </div>' +
          '  </nav>' +
      
          '<ul class="sidenav" id="mobile-demo">' +
          '  <li><a ui-sref="index">Home</a></li>' +
          '  <li><a ui-sref="">Login</a></li>' +
          '</ul>'
    }
})

'use strict';

/**
 * @ngdoc function
 * @name angularJsAppApp.controller:DetailController
 * @description
 * # DetailController
 * Controller of the angularJsAppApp
 */
angular.module('angularJsAppApp').controller('DetailController', 
  function ($scope, $stateParams, PostsService, $http) {
    $scope.params = $stateParams;
    $scope.paramsBluePrint = {'#': null,'pid': 2};
    console.log($scope.params);
    console.log("Resource id: " + $scope.params.pid);
    $scope.detail = "detail";
    $scope.loading = false;
    $scope.formattedDetailCollection = [];
    $scope.getPostDetails = function(postId) {
      $scope.loading = true;
      PostsService.getPost(postId)
      .then(function(data) {
        // console.log(data.lenght);
        $scope.formattedDetailCollection.push(data.plain());
        console.log($scope.formattedDetailCollection);
        $scope.loading = false;
      })
      .catch(function(error) {
        console.error(error);
        $scope.loading = false;
      })
    }
    $scope.getPostDetails($scope.params.pid);
});

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
