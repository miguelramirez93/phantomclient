'use strict';

/**
 * @ngdoc function
 * @name phantomclientApp.controller:ItemsCategoriaRegistroCtrl
 * @description
 * # ItemsCategoriaRegistroCtrl
 * Controller of the phantomclientApp
 */
angular.module('phantomclientApp')
  .controller('ItemsCategoriaRegistroCtrl', function(phantomRequest) {
    var self = this;
    self.categoriaPadreSel = null;
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
      });
    };

    self.limpiar = function() {
      self.nombreCat = null;
      self.descrpCat = null;
      self.categoriaPadreSel = null;
    };

    self.cargarArbolCategorias();

    self.RegistrarCategoria = function() {
      self.categoria_a_registrar = {};
      if (self.nombreCat == null) {
        swal('', 'El nombre de la categoria es requerido.', 'error');
      } else {
        self.categoria_a_registrar.nombre = self.nombreCat;
        self.categoria_a_registrar.descripcion = self.descrpCat;
        var url = 'categoriarest/categorias?';
        if (self.categoriaPadreSel == undefined || self.categoriaPadreSel == null) {

        } else {
          url = url + 'padre=' + self.categoriaPadreSel.id
        }
        phantomRequest.post(url, self.categoria_a_registrar).then(function(response) {
          console.log(response.data);
          if (response.data == true) {
            swal('', 'Se registro la categoria.', 'success');
            self.limpiar();
            self.cargarArbolCategorias();
          } else if (response.data.message != undefined) {
            if (response.data.message[0] === "Error Number: 1062") {
              swal('', 'La categoria con nombre ' + self.categoria_a_registrar.nombre + ' ya se encuentra registrada.', 'error');
            } else {
              swal('', 'error del servidor.', 'error')
            }

          } else {
            swal('', 'error del servidor.', 'error')
          }
        });

      }

    };
  });
