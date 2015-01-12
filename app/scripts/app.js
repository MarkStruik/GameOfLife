'use strict';

/**
 * @ngdoc overview
 * @name gameOfLifeApp
 * @description
 * # gameOfLifeApp
 *
 * Main module of the application.
 */
angular
  .module('gameOfLifeApp', [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch',

    'Game'
  ])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        //controller: 'MainCtrl'
      })
      .when('/about', {
        templateUrl: 'views/about.html',
        //controller: 'AboutCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });

  });
