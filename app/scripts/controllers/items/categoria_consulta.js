'use strict';

/**
 * @ngdoc function
 * @name phantomclientApp.controller:ItemsCategoriaConsultaCtrl
 * @description
 * # ItemsCategoriaConsultaCtrl
 * Controller of the phantomclientApp
 */
angular.module('phantomclientApp')
  .controller('ItemsCategoriaConsultaCtrl', function (phantomRequest) {
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
    self.cargarArbolCategorias = function(){
      phantomRequest.get('categoriacategoriarest/jerarquiacategorias','').then(function(response){
        self.dataForTheTree = response.data;
        console.log(response.data);
      });
    };

    self.cargarArbolCategorias();

    self.actualizarCategoria = function(){
      phantomRequest.put('categoriarest/categorias',self.categoriaPadreSel.id,self.categoriaPadreSel).then(function(response){
        if (response.data == true){
          swal('','Se Actualizo la categoria.','success');
        }else if (response.data.message != undefined) {
          if(response.data.message[0] === "Error Number: 1062"){
            swal('','La categoria con nombre '+self.categoria_a_registrar.nombre+' ya se encuentra registrada.', 'error');
          }else{
            swal('','error del servidor.', 'error');
          }
        }else{
          swal('','error del servidor.', 'error');
        }
      });
    };
    self.eliminarCategoria = function(){
      phantomRequest.delete('categoriarest/categorias',self.categoriaPadreSel.id).then(function(response){
        if (response.data == true){
          swal('','Se Elimino la categoria.','success');
          self.cargarArbolCategorias();
        }else if (response.data.message != undefined) {
          if(response.data.message[0] === "Error Number: 1451"){
            swal('','La categoria con nombre '+self.categoriaPadreSel.nombre+' esta siendo referenciada como hijo o padre de otra categoria.', 'error');
          }else{
            swal('','error del servidor.', 'error');
          }
        }else{
          swal('','error del servidor.', 'error');
        }
      });
    };
  });
