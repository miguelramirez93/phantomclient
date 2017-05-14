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
    self.gridOptions = {
      enableFiltering : true,
      enableSorting : true,
      enableRowSelection: false,
      enableRowHeaderSelection: false,
      columnDefs : [
        {field: 'id',             visible : false},
        {field: 'nombre',       cellClass:'alignleft', cellClass: 'input_center'},
        {field: 'tipo_documento.nombre',   displayName: 'Tipo Documento', cellClass: 'input_center'},
        {field: 'num_documento' , displayName : 'Documento No. ' , cellClass: 'input_center'},
        {field: 'tipo_persona.nombre', displayName : 'Tipo Persona'},
        {field: 'Opciones', cellTemplate: '<button class="btn btn-link fa fa-eye faa-wrench animated-hover" ng-click="grid.appScope.personaConsulta.ver_persona(row)"></button>'}
      ]

    };

    self.cargarPersonas = function (){
      phantomRequest.get('personarest/personas','').then(function(response){
        self.gridOptions.data = response.data;
        console.log(response.data);
      });
    };
    self.cargarPersonas();

    self.ver_persona= function(row){
      $("#myModal").modal();
      console.log(row.entity);
      self.detalle_persona = row.entity;
    };
  });
