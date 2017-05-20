'use strict';

describe('Controller: ItemsItemRegistroCtrl', function () {

  // load the controller's module
  beforeEach(module('phantomclientApp'));

  var ItemsItemRegistroCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    ItemsItemRegistroCtrl = $controller('ItemsItemRegistroCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(ItemsItemRegistroCtrl.awesomeThings.length).toBe(3);
  });
});
