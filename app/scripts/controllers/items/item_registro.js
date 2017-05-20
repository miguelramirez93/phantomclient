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
      dirSelectable: false,
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

    self.limpiar = function(){
      self.nombre = null;
      self.descrp = null;
      self.categoriasSel = [];
    };

    self.registrarElemento = function(){
      if (self.nombre == null || self.nombre == undefined){
        swal('','Debe dar un nombre al item.', 'error');
      }else if (self.categoriasSel[0] == null || self.categoriasSel[0] == undefined){
        swal('','Debe seleccionar por lo menos una categoria para este item.', 'error');
      }else{
        var data = {};
        data.elemento = {};
        data.categorias = [];
        data.elemento.nombre = self.nombre;
        data.elemento.descripcion = self.descrp;
        data.categorias = self.categoriasSel;
        var url = 'elementorest/elementos?';
        phantomRequest.post(url,data).then(function(response){
          console.log(response.data);
          if (response.data == true) {
            swal('', 'Se registro el item.', 'success');
            self.limpiar();
            self.cargarArbolCategorias();
          } else if (response.data.message != undefined) {
            if (response.data.message[0] === "Error Number: 1062") {
              swal('', 'El elemento con nombre ' + self.nombre + ' ya se encuentra registrado.', 'error');
            } else {
              swal('', 'error del servidor.', 'error')
            }

          } else {
            swal('', 'error del servidor.', 'error')
          }
        });
      }

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
