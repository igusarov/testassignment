(function() {
  'use strict';

  angular
    .module('app')
    .config(routerConfig);

  /** @ngInject */
  function routerConfig($stateProvider, $urlRouterProvider) {
    $stateProvider
      .state('home', {
        url: '/home',
        templateUrl: 'app/pages/main/main.html',
        controller: 'MainController',
        controllerAs: 'main'
      }).state('search', {
        url: '/',
        templateUrl: 'app/pages/search/search.html',
        controller: 'SearchController',
        controllerAs: 'search'
      }).state('result', {
        url: '/result?q',
        templateUrl: 'app/pages/result/result.html',
        controller: 'ResultController',
        controllerAs: 'result'
      }).state('info', {
        url: '/info/:questionId',
        templateUrl: 'app/pages/info/info.html',
        controller: 'InfoController',
        controllerAs: 'info'
      });

    $urlRouterProvider.otherwise('/');
  }

})();
