'use strict';

describe('Controller: IndexController', function () {

  // load the controller's module
  beforeEach(module('angularJsAppApp'));

  var IndexController,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    IndexController = $controller('IndexController', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(IndexController.awesomeThings.length).toBe(3);
  });
});
