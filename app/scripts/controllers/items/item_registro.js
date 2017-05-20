'use strict';

/**
 * @ngdoc function
 * @name phantomclientApp.controller:ItemsItemRegistroCtrl
 * @description
 * # ItemsItemRegistroCtrl
 * Controller of the phantomclientApp
 */
angular.module('phantomclientApp')
  .controller('ItemsItemRegistroCtrl', function(phantomRequest, $scope) {
    var self = this;
    self.categoriaPadreSel = null;
    self.categoriasSel = [];
    self.filtroCat = "";
    self.treeOptions = {
      nodeChildren: "children",
      dirSelectable: true,
      injectClasses: {
        ul: "a1",
        li: "a2",
        liSelected: "a7",
        iExpanded: "a3",
        iCollapsed: "a4",
        iLeaf: "a5",
        label: "a6",
        labelSelected: "a8"
      }
    };
    self.cargarArbolCategorias = function() {
      phantomRequest.get('categoriacategoriarest/jerarquiacategorias', '').then(function(response) {
        self.dataForTheTree = response.data;
        console.log(response.data);
      });
    };

    self.cargarArbolCategorias();

    self.quitarCategoria = function(value) {
      var index = self.categoriasSel.indexOf(value);
      self.categoriasSel.splice(index, 1);
    };

    $scope.$watch("itemRegistro.categoriaPadreSel", function(newValue, oldValue) {
      if (newValue === oldValue) {
        return;
      }
      if (!self.categoriasSel.some(item => item.id === newValue.id)) {
        var element = {};
        element.id = newValue.id;
        element.nombre = newValue.nombre;
        self.categoriasSel.push(element);
      } else {

      }

      console.log(self.categoriasSel);
    });
  });
