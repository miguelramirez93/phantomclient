'use strict';

/**
 * @ngdoc function
 * @name phantomclientApp.controller:ItemsItemConsultaCtrl
 * @description
 * # ItemsItemConsultaCtrl
 * Controller of the phantomclientApp
 */
angular.module('phantomclientApp')
  .controller('ItemsItemConsultaCtrl', function(phantomRequest, $scope) {
    var self = this;
    self.categoriasagregadas = [];
    self.categoriaseliminadas = [];
    self.modificar = false;
    self.editar = false;
    self.gridOptions = {
      enableFiltering: true,
      enableSorting: true,
      enableRowSelection: false,
      enableRowHeaderSelection: false,
      columnDefs: [{
          field: 'id',
          visible: false
        },
        {
          field: 'nombre',
          cellClass: 'text-uppercase',
          width: "*"
        },
        {
          field: 'descripcion',
          cellClass: 'text-uppercase',
          width: "*"
        },
        {
          field: 'Opciones',
          cellTemplate: '<button class="btn btn-link fa fa-eye faa-wrench animated-hover" ng-click="grid.appScope.itemConsulta.ver_elemento(row)"></button>' +
            '<button class="btn btn-link fa fa-pencil faa-wrench animated-hover" ng-click="grid.appScope.itemConsulta.ver_elemento_edit(row)"></button>' +
            '<button class="btn btn-link fa fa-trash-o faa-wrench animated-hover" ng-click="grid.appScope.itemConsulta.eliminarElemento(row.entity.id)"></button>',
          width: "*"
        }
      ]

    };

    self.cargarItems = function() {
      var url = 'elementorest/elementos?';
      phantomRequest.get(url, '').then(function(response) {
        self.gridOptions.data = response.data;
        console.log(response.data);
      });
    };

    self.ver_elemento = function(row) {
      $("#myModal").modal();
      console.log(row.entity);
      self.detalle_item = row.entity;
    };
    self.limpiar_elemento = function() {
      self.categoriaPadreSel = null;
      self.categoriasagregadas = [];
      self.categoriasEliminadas = [];
      self.detalle_item = null;
      self.modificar = false;
      self.editar = false;
      $("#myModal").modal('hide');
      self.cargarItems();
      self.cargarArbolCategorias();
    };
    self.categoriaPadreSel = null;
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


    self.ver_elemento_edit = function(row) {
      self.cargarArbolCategorias();
      self.modificar = true;
      self.editar = true;
      $("#myModal").modal();
      console.log(row.entity);
      self.detalle_item = row.entity;
    };

    self.actualizarElemento = function() {
      var data = {};
      if (self.categoriasagregadas[0] == null && self.detalle_item.categorias[0] == null) {
        swal('', 'El elemento debe tener al menos una categoria.', 'error');
      } else {
        data.elemento = self.detalle_item;
        data.eliminarcategorias = self.categoriaseliminadas;
        data.agregarcategorias = self.categoriasagregadas;
        phantomRequest.put('elementorest/elementos', self.detalle_item.id, data).then(function(response) {
          if (response.data == true) {
            swal('', 'El elemento se actualizo correctamente.', 'success').then(function() {
              self.limpiar_elemento();
            });
          } else {
            swal('', 'Error al actualizar.', 'error').then(function() {
              self.limpiar_elemento();
            });
          }
        });
      }

    };

    self.eliminarElemento = function(id) {
      phantomRequest.delete('elementorest/elementos',id).then(function(response) {
        if (response.data == true) {
          swal('', 'El elemento se Elimino correctamente.', 'success').then(function() {
            self.limpiar_elemento();
          });
        } else {
          swal('', 'Error al eliminar.', 'error').then(function() {
            self.limpiar_elemento();
          });
        }

      });
    }

    self.quitarCategoria = function(value) {
      var index = self.detalle_item.categorias.indexOf(value);
      self.detalle_item.categorias.splice(index, 1);
      self.categoriaseliminadas.push(value);
    };

    self.quitarCategoriaagr = function(value) {
      var index2 = self.categoriasagregadas.indexOf(value);
      self.categoriasagregadas.splice(index2, 1);
    };

    $scope.$watch("itemConsulta.categoriaPadreSel", function(newValue, oldValue) {
      if (newValue === oldValue) {
        return;
      }
      if (!self.detalle_item.categorias.some(item => item.id === newValue.id)) {
        if (!self.categoriasagregadas.some(item => item.id === newValue.id)) {
          var element = {};
          element.id = newValue.id;
          element.nombre = newValue.nombre;
          self.categoriasagregadas.push(element);
        } else {

        }
      } else {

      }



      console.log(self.categoriasagregadas);
    });

    self.cargarItems();
  });
