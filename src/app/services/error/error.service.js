(function() {
  'use strict';

  angular
    .module('app')
    .factory('errorService', errorService);

  /** @ngInject */
  function errorService(toastr) {

    return {
      somethingWentWrong: somethingWentWrong
    };

    function somethingWentWrong() {
      toastr.error('Something went wrong', 'Error');
    }

  }
})();
