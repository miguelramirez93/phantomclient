'use strict';

/**
 * @ngdoc overview
 * @name phantomclientApp
 * @description
 * # phantomclientApp
 *
 * Main module of the application.
 */
angular
  .module('phantomclientApp', [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch',
    'ui.grid',
    'ui.grid.edit',
    'ui.grid.rowEdit',
    'ui.grid.cellNav',
    'ui.grid.treeView',
    'ui.grid.selection',
    'ui.grid.exporter',
    'ui.grid.autoResize',
    'ui.grid.pagination',
    'ui.grid.resizeColumns',
    //  'ui.grid.autoFitColumns',
    'phantomService',
    'treeControl'
  ])
  .config(['$locationProvider', '$routeProvider', function($locationProvider, $routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl',
        controllerAs: 'main'
      })
      .when('/about', {
        templateUrl: 'views/about.html',
        controller: 'AboutCtrl',
        controllerAs: 'about'
      })
      .when('/personas/persona_consulta', {
        templateUrl: 'views/personas/persona_consulta.html',
        controller: 'PersonasPersonaConsultaCtrl',
        controllerAs: 'personaConsulta'
      })
      .when('/items/categoria_registro', {
        templateUrl: 'views/items/categoria_registro.html',
        controller: 'ItemsCategoriaRegistroCtrl',
        controllerAs: 'categoriaRegistro'
      })
      .when('/items/categoria_consulta', {
        templateUrl: 'views/items/categoria_consulta.html',
        controller: 'ItemsCategoriaConsultaCtrl',
        controllerAs: 'categoriaConsulta'
      })
      .when('/items/item_registro', {
        templateUrl: 'views/items/item_registro.html',
        controller: 'ItemsItemRegistroCtrl',
        controllerAs: 'itemRegistro'
      })
      .when('/items/item_consulta', {
        templateUrl: 'views/items/item_consulta.html',
        controller: 'ItemsItemConsultaCtrl',
        controllerAs: 'itemConsulta'
      })
      .otherwise({
        redirectTo: '/'
      });
  }]);
