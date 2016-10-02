(function() {
  'use strict';

  angular
    .module('app')
    .config(config);

  /** @ngInject */
  function config($logProvider, toastrConfig, stackoverflowConfig) {
    // Enable log
    $logProvider.debugEnabled(true);

    // Set options third-party lib
    toastrConfig.allowHtml = true;
    toastrConfig.timeOut = 3000;
    toastrConfig.positionClass = 'toast-top-right';
    toastrConfig.progressBar = true;

    // Stackoverflow API configuration
    stackoverflowConfig.url = 'http://api.stackexchange.com/2.2/';
    stackoverflowConfig.pageSize = 5;
    stackoverflowConfig.site = 'stackoverflow';
  }

})();
