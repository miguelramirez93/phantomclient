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
    'phantomService'
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
      .otherwise({
        redirectTo: '/'
      });
  }]);
