'use strict';

describe('Controller: IndexController', function () {
  beforeEach(module('angularJsAppApp'));

  var $controller;

  beforeEach(inject(function(_$controller_){
    // The injector unwraps the underscores (_) from around the parameter names when matching
    $controller = _$controller_;
  }));

  describe('Checking IndexController.js initial set values', function() {
    var $scope, controller;
    beforeEach(function() {
      $scope = {};
      controller = $controller('IndexController', {
        $scope: $scope
      });
    });
    
    // check initial values of scope variables
    it('Should check scope.indexContent value string', function() {
      expect($scope.indexContent).toEqual('Hello. I am index controller content.');
    })
    it('Should return scope.sortType albumId', function() {
      expect($scope.sortType).toEqual("albumId");
    })
    it('Should return scope.sortReverse false', function() {
      expect($scope.sortReverse).toEqual(false);
    })
    it('Should check scope.searchPost value', function() {
      expect($scope.searchPost).toBe('');
    })
    it('$scope.loading should initially return false', function() {
      expect($scope.loading).toEqual(true);
    })
  })
});

describe('Controller: DetailController', function () {
  beforeEach(module('angularJsAppApp'));

  var $controller;

  beforeEach(inject(function(_$controller_){
    // The injector unwraps the underscores (_) from around the parameter names when matching
    $controller = _$controller_;
  }));
  describe('Checking DetailController.js initial set values', function() {
    var $scope, controller;
    beforeEach(function() {
      $scope = {};
      controller = $controller('DetailController', {
        $scope: $scope
      });
    });
    // check initial values of scope variables
    it('Should check scope.params is of type object', function() {
      expect($scope.params).toEqual(jasmine.any(Object));
    })
    it('Should check scope.loading', function() {
      expect($scope.loading).toEqual(jasmine.any(Boolean));
    })
    it('Should check scope.loading', function() {
      expect($scope.formattedDetailCollection.length).toEqual(0);
      expect($scope.formattedDetailCollection).toEqual(jasmine.any(Array));
    })

    // checks that our $scope.params object contains all the required properties
    describe('jasmine.objectContaining', function() {
      it('Has these properties', function() {
        expect(Object.keys($scope.paramsBluePrint)).toContain('pid');
        expect(Object.keys($scope.paramsBluePrint)).toContain('#');
      })
    })
  })
})

describe('Post Details Service', function() {
  var scope;
  var element;
  var elementScope;
  var PostsService;
  var Restangular;
  var httpBackend;

  beforeEach(module('angularJsAppApp'))
  beforeEach(angular.mock.module("restangular"));

  beforeEach(inject(function (
    $rootScope, 
    $compile,
    _$httpBackend_,
    _PostsService_,
    _Restangular_) {
    scope = $rootScope.$new();
    scope.row = 1;

    PostsService = _PostsService_;
    httpBackend = _$httpBackend_;
    Restangular = _Restangular_;
  }));

  it('should contain an api service',function () {
    expect(PostsService).not.toEqual(null);
  });

  it('should provide get', function (done) {
    var dataObject = {
      "albumId": 1,
      "id": 2,
      "title": "reprehenderit est deserunt velit ipsam",
      "url": "https://via.placeholder.com/600/771796",
      "thumbnailUrl": "https://via.placeholder.com/150/771796"
    };
    httpBackend.expectGET("https://jsonplaceholder.typicode.com/photos/2")
      .respond(200,dataObject);
      PostsService.getPost(2).then(function(data) {
        expect(data.id).toBe(2);
        httpBackend.flush();
      }).catch(function(error) {
        done();
      })
      done();
  });
});

describe('Posts Service', function() {
  // API
  var postService, Restangular;

  beforeEach(module('angularJsAppApp'));

  beforeEach(inject(function (_Restangular_, PostsService) {
    postService = PostsService
    Restangular = _Restangular_;
  }));

  it('PostsService getPosts should be defined', function() {
    expect(postService.getPosts).toBeDefined();
  })

  it('PostsService getPost should be defined', function() {
    expect(postService.getPost).toBeDefined();
  })
})

describe("Navbar directive", function() {
  var elem, scope;

  describe("template", function () {
             var $compile;
             var $scope;
    
    beforeEach(module('angularJsAppApp'));

    beforeEach(inject(function(_$compile_, _$rootScope_) {
      $compile = _$compile_;
      $scope = _$rootScope_.$new();
    }));

    it('Should render the scope variables and text as passed in by $scope',
      inject(function() {
        // $compile the template, and pass in the $scope.
        // This will find your directive and run everything
        var template = $compile('<nav-bar></nav-bar>')($scope);

        // Set some values on your $scope
        $scope.header = "Resource Finder";
        $scope.home = "Home";
        $scope.login = "Login";
        $scope.$digest();

        // Render the template as a string
        var templateAsHtml = template.html();

        // verify that the $scope.variables are in the template
        expect(templateAsHtml).toContain($scope.header);
        expect(templateAsHtml).toContain($scope.home);
        expect(templateAsHtml).toContain($scope.login);
        expect($scope.indexString).toEqual('index');
      }))
  })
})

// test ui states
describe('Testing app.js routes', function() {
  var stateHome, statePosts, errorPage;
  beforeEach(module('angularJsAppApp'));
  beforeEach(inject(function ($state) {
    stateHome = $state.get('index');
    statePosts = $state.get('posts');
    errorPage = $state.get('404');
  }));

  // for homepage
  it('Matches the home page url', function () {
    expect(stateHome.url).toEqual('/');
  });
  it('Matches the home page name', function () {
    expect(stateHome.name).toEqual('index');
  });
  it('Matches the home page templateUrl', function () {
    expect(stateHome.templateUrl).toEqual('./views/index-view.html');
  });
  it('Matches the home page controller', function () {
    expect(stateHome.controller).toEqual('IndexController');
  });

  // for posts page
  it('Matches the posts page url', function () {
    expect(statePosts.url).toEqual('/posts/:pid');
  });
  it('Matches the posts page name', function () {
    expect(statePosts.name).toEqual('posts');
  });
  it('Matches the posts page templateUrl', function () {
    expect(statePosts.templateUrl).toEqual('./views/detail-view.html');
  });
  it('Matches the home page controller', function () {
    expect(statePosts.controller).toEqual('DetailController');
  });

  // for posts page
  it('Matches the posts page url', function () {
    expect(errorPage.url).toEqual('/404');
  });
  it('Matches the posts page name', function () {
    expect(errorPage.name).toEqual('404');
  });
  it('Matches the posts page templateUrl', function () {
    expect(errorPage.templateUrl).toEqual('./views/404-view.html');
  });
})