(function() {
  'use strict';

  angular
    .module('app')
    .controller('SearchController', SearchController);

  /** @ngInject */
  function SearchController($scope, $document, $state) {
    var vm = this;
    vm.query = '';

    vm.onSubmit = submitQuery;

    $document.bind("keypress", function(event){
      if(event.which === 13) {
        $scope.$apply(submitQuery);
        event.preventDefault();
      }
    });

    function submitQuery(){
      if(vm.query){
        $state.go('result', {
          q : vm.query
        });
      }
    }
  }
})();
