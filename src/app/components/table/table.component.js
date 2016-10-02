(function() {
  'use strict';

  angular
    .module('app')
    .component('tableComponent', {
      restrict: 'E',
      scope: {},
      bindings: {
        items: '<',
        showSpinner: '<',
        onAuthorClick: '&',
        onQuestionClick: '&',
        onTagClick: '&'
      },
      templateUrl: 'app/components/table/table.template.html',
      controller: TableController
    });

  /** @ngInject */
  function TableController() {
    var vm = this;

    vm.propertyName = null;
    vm.reverse = false;

    vm.sortBy = function (propertyName) {
      vm.reverse = (propertyName !== null && vm.propertyName === propertyName)
        ? !vm.reverse : false;
      vm.propertyName = propertyName;
    };

  }
})();
