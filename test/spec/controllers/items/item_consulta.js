'use strict';

describe('Controller: ItemsItemConsultaCtrl', function () {

  // load the controller's module
  beforeEach(module('phantomclientApp'));

  var ItemsItemConsultaCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    ItemsItemConsultaCtrl = $controller('ItemsItemConsultaCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(ItemsItemConsultaCtrl.awesomeThings.length).toBe(3);
  });
});
