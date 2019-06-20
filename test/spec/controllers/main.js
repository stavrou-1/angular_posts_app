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

// Let's just test some data service thing.
describe("Data Service testing /posts", function() {
  var NewModulePostsService, $q, $httpBackend;
  var API = "https://jsonplaceholder.typicode.com/posts/";
  var RESPONSE_SUCCESS = {
    "userId": 1,
    "id": 2,
    "title": "qui est esse",
    "body": "est rerum tempore vitae\nsequi sint nihil reprehenderit dolor beatae ea dolores neque\nfugiat blanditiis voluptate porro vel nihil molestiae ut reiciendis\nqui aperiam non debitis possimus qui neque nisi nulla"
  };

  // Add new mocked error response;
  var RESPONSE_ERROR = {};

  beforeEach(module('newModule'));

  beforeEach(inject(function(_NewModulePostsService_, _$q_, _$httpBackend_) {
    NewModulePostsService = _NewModulePostsService_;
    $q = _$q_;
    $httpBackend = _$httpBackend_;
  }));

  it('should exist', function() {
    expect(NewModulePostsService).toBeDefined();
  });

  describe("returnPost()", function() {
    var result;
    
    beforeEach(function() {
      result = {};
      spyOn(NewModulePostsService, "returnPost").and.callThrough();
    });

    it('Should return a NewModulePostsService when called with a valid id', function() {
      var search = 2;
      $httpBackend.whenGET(API + search).respond(200, $q.when(RESPONSE_SUCCESS));

      expect(NewModulePostsService.returnPost).not.toHaveBeenCalled();
      expect(result).toEqual({});

      $httpBackend.expectGET(API + search).respond(200, RESPONSE_SUCCESS);

      NewModulePostsService.returnPost(search)
        .then(function(res) {
          result = res;
      });

      $httpBackend.flush();

      console.log(JSON.stringify(result,null,2));

      expect(NewModulePostsService.returnPost).toHaveBeenCalledWith(search);
      expect(result.userId).toEqual(1);
      expect(result.id).toEqual(2);
      expect(result.title).toEqual('qui est esse');
      expect(result.body).toEqual('est rerum tempore vitae\nsequi sint nihil reprehenderit dolor beatae ea dolores neque\nfugiat blanditiis voluptate porro vel nihil molestiae ut reiciendis\nqui aperiam non debitis possimus qui neque nisi nulla');
    });

    it('Should return a 404 when called with an invalid id', function() {
      // update search term
      var search = "godzilla";

      // update status code and response object (reject instead of when/resolve)
      $httpBackend.whenGET(API + search).respond(404, $q.reject(RESPONSE_ERROR));

      expect(NewModulePostsService.returnPost).not.toHaveBeenCalled();
      expect(result).toEqual({});

      $httpBackend.expectGET(API + search).respond(404, RESPONSE_ERROR);

      // // update chained method to catch
      NewModulePostsService.returnPost(search)
        .catch(function(res) {
          result = res;
      });
        
      $httpBackend.flush();

      expect(NewModulePostsService.returnPost).toHaveBeenCalledWith(search);
      expect(result).toEqual(RESPONSE_ERROR); // json placeholder just returns an empty object for no results.
    })
  });
});