'use strict';

/**
 * @ngdoc function
 * @name phantomclientApp.controller:ItemsCategoriaRegistroCtrl
 * @description
 * # ItemsCategoriaRegistroCtrl
 * Controller of the phantomclientApp
 */
angular.module('phantomclientApp')
  .controller('ItemsCategoriaRegistroCtrl', function (phantomRequest) {
    var self = this;
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
    self.cargarArbolCategorias = function(){
      phantomRequest.get('categoriacategoriarest/jerarquiacategorias','').then(function(response){
        self.dataForTheTree = response.data;
      });
    };

    self.cargarArbolCategorias();
  });
