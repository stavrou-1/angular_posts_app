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
  var $scope,
      PostsService, 
      Restangular, 
      $httpBackend;

  beforeEach(function() {
    module('angularJsAppApp');

    inject(function($rootScope, _$httpBackend_, _PostsService_, $controller) {
      $scope = $rootScope.$new();
      $httpBackend = _$httpBackend_;
      PostsService = _PostsService_;

      var user = 2;
      $httpBackend.whenGET('https://jsonplaceholder.typicode.com' + '/photos/' + user).respond(200,{
          "albumId": 1,
          "id": 2,
          "title": "reprehenderit est deserunt velit ipsam",
          "url": "https://via.placeholder.com/600/771796",
          "thumbnailUrl": "https://via.placeholder.com/150/771796"
        });
    });
  });

  describe("process details", function() {
    it('executres details now', function(done) {
      $httpBackend.expectGET('https://jsonplaceholder.typicode.com/photos/2');
      PostsService.getPost(2).then(function(data) {
        expect(data.id).toBe(2);
        done();
      });
      $httpBackend.flush();
    })
  });

  // TODO. Check this again. Add more tests if appropriate.
});

describe('Posts Service', function() {
  // API
  var postService, Restangular;

  beforeEach(module('angularJsAppApp'))

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

  //TODO FIXME
  // it('PostsService should return data', function(done) {
  //   postService.getPosts().then(function(data) {
  //     console.log("Executed postservice.");
  //     // expect(data[1].id).toEqual(2);
  //     expect(true).toBe(true);
  //     done();
  //   }).catch(function(error) {
  //     console.log(error);
  //     done();
  //   })
  // });
})

