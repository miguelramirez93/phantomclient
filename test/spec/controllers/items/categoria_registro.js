'use strict';

describe('Controller: ItemsCategoriaRegistroCtrl', function () {

  // load the controller's module
  beforeEach(module('phantomclientApp'));

  var ItemsCategoriaRegistroCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    ItemsCategoriaRegistroCtrl = $controller('ItemsCategoriaRegistroCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(ItemsCategoriaRegistroCtrl.awesomeThings.length).toBe(3);
  });
});
