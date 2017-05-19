'use strict';

describe('Controller: ItemsCategoriaConsultaCtrl', function () {

  // load the controller's module
  beforeEach(module('phantomclientApp'));

  var ItemsCategoriaConsultaCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    ItemsCategoriaConsultaCtrl = $controller('ItemsCategoriaConsultaCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(ItemsCategoriaConsultaCtrl.awesomeThings.length).toBe(3);
  });
});
