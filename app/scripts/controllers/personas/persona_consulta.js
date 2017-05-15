'use strict';

/**
 * @ngdoc function
 * @name phantomclientApp.controller:PersonasPersonaConsultaCtrl
 * @description
 * # PersonasPersonaConsultaCtrl
 * Controller of the phantomclientApp
 */
angular.module('phantomclientApp')
  .controller('PersonasPersonaConsultaCtrl', function (phantomRequest) {
    var self = this;
    self.modificar = false;
    self.editar = false;
    self.gridOptions = {
      enableFiltering : true,
      enableSorting : true,
      enableRowSelection: false,
      enableRowHeaderSelection: false,
      columnDefs : [
        {field: 'id',             visible : false},
        {field: 'nombre',       cellClass:'alignleft', cellClass: 'input_center', width: "*"},
        {field: 'tipo_documento.nombre',   displayName: 'Tipo Documento', cellClass: 'input_center'},
        {field: 'num_documento' , displayName : 'Documento No. ' , cellClass: 'input_center'},
        {field: 'tipo_persona.nombre', displayName : 'Tipo Persona'},
        {field: 'Opciones', cellTemplate: '<button class="btn btn-link fa fa-eye faa-wrench animated-hover" ng-click="grid.appScope.personaConsulta.ver_persona(row)"></button>'+
        '<button class="btn btn-link fa fa-pencil faa-wrench animated-hover" ng-click="grid.appScope.personaConsulta.ver_persona_edit(row)"></button>'+
        '<button class="btn btn-link fa fa-trash-o faa-wrench animated-hover" ng-click="grid.appScope.personaConsulta.eliminar_persona(row.entity.id)"></button>', width: "*"}
      ]

    };

    self.cargarPersonas = function (){
      phantomRequest.get('personarest/personas','').then(function(response){
        self.gridOptions.data = response.data;
        console.log(response.data);
      });
    };

    self.cargarPersonas();

    self.cargarTipoPersona = function () {
      phantomRequest.get('tipopersonarest/tipospersona','').then(function(response){
        self.tipospersona = response.data;
        console.log(response.data);
      });
    };
    self.cargarTipoPersona();

    self.cargarTipoDocumento = function () {
      phantomRequest.get('tipodocumentorest/tiposdocumento','').then(function(response){
        self.tiposdocumento = response.data;
        console.log(response.data);
      });
    };
    self.cargarTipoDocumento();

    self.ver_persona= function(row){
      $("#myModal").modal();
      console.log(row.entity);
      self.detalle_persona = row.entity;
    };

    self.ver_persona_edit= function(row){
      self.modificar = true;
      self.editar = true;
      $("#myModal").modal();
      console.log(row.entity);
      self.detalle_persona = row.entity;
      self.tipoPersonaSel = self.detalle_persona.tipo_persona;
      self.tipoDocumentoSel= self.detalle_persona.tipo_documento ;
    };



    self.limpiar_persona = function(){
      self.detalle_persona = null;
      self.modificar = false;
      self.editar = false;
      $("#myModal").modal('hide');
    };

    self.mostrar_form_registro_persona = function(){
      self.modificar = true;
      $("#myModal").modal();
    };

    self.eliminar_persona=function(id){
      console.log(id);
      phantomRequest.delete('personarest/personas',id).then(function(response){
        console.log(response.data);
        if (typeof response.data === 'boolean'){
          if (response.data){
            swal("", "Dato Eliminado Exitosamente", "success").then(function(){
              self.limpiar_persona();
              self.cargarPersonas();
            });
          }else{
            sweetAlert("", "No se pudo eliminar el Dato debido a un error desconocido", "error");
          }
        }else if (typeof response.data === 'object'){

            sweetAlert("", response.data.message[1], "error");
        }else{

        }

      });
    }


    self.actualizar_persona = function(){
      if(self.detalle_persona == undefined || self.detalle_persona.nombre == null){

      }else if (self.detalle_persona.num_documento == null){

      }else if (self.tipoPersonaSel == undefined){
        sweetAlert("", "Debe seleccionar el tipo de persona", "error");
      }else if (self.tipoDocumentoSel == undefined){
        sweetAlert("", "Debe seleccionar el tipo de documento", "error");
      }else{
        self.detalle_persona.tipo_persona = self.tipoPersonaSel.id;
        self.detalle_persona.tipo_documento = self.tipoDocumentoSel.id;
        phantomRequest.put('personarest/personas',self.detalle_persona.id, self.detalle_persona).then(function(response){
          console.log(response.data);
          if (typeof response.data === 'boolean'){
            if (response.data){
              swal("", "Actualización exitosa", "success").then(function(){
                self.limpiar_persona();
                self.cargarPersonas();
              });
            }else{
              sweetAlert("", "No se registro debido a un error desconocido", "error");
            }
          }else if (typeof response.data === 'object'){

              sweetAlert("", response.data.message[1], "error");
          }else{

          }
        });
      }
    };


    self.registrar_persona = function() {
      if(self.detalle_persona == undefined || self.detalle_persona.nombre == null){

      }else if (self.detalle_persona.num_documento == null){

      }else if (self.tipoPersonaSel == undefined){
        sweetAlert("", "Debe seleccionar el tipo de persona", "error");
      }else if (self.tipoDocumentoSel == undefined){
        sweetAlert("", "Debe seleccionar el tipo de documento", "error");
      }else{
        self.detalle_persona.tipo_persona = self.tipoPersonaSel.id;
        self.detalle_persona.tipo_documento = self.tipoDocumentoSel.id;
        phantomRequest.post('personarest/personas', self.detalle_persona).then(function(response){
          console.log(response.data);
          if (typeof response.data === 'boolean'){
            if (response.data){
              swal("", "Registro exitoso", "success").then(function(){
                self.limpiar_persona();
                self.cargarPersonas();
              });
            }else{
              sweetAlert("", "No se registro debido a un error desconocido", "error");
            }
          }else if (typeof response.data === 'object'){

              sweetAlert("", response.data.message[1], "error");
          }else{

          }
        });
      }

    };
  });
