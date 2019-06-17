'use strict';

describe('Controller: IndexController', function () {
  beforeEach(module('angularJsAppApp'));

  var $controller;

  beforeEach(inject(function(_$controller_){
    // The injector unwraps the underscores (_) from around the parameter names when matching
    $controller = _$controller_;
  }));

  describe('$scope.indexContent', function() {
    var $scope, controller;
    beforeEach(function() {
      $scope = {};
      controller = $controller('IndexController', {
        $scope: $scope
      });
    });

    it('Should check scope.indexContent value string', function() {
      expect($scope.indexContent).toEqual('Hello. I am index controller content.');
    })
    it('Should return scope.sortType albumId', function() {
      expect($scope.sortType).toEqual("albumId");
    })
    it('Should return scope.sortReverse false', function() {
      expect($scope.sortReverse).toEqual(false);
    })
  })

  describe('arb', function() {
    it('Tests some arbitrary array', function() {
      var users = ['jack', 'igor', 'jeff'];
      expect(users).toEqual(['jack', 'igor', 'jeff']);
    })  
  })


});
