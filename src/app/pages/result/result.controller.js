(function() {
  'use strict';

  angular
    .module('app')
    .controller('ResultController', ResultController);

  /** @ngInject */
  function ResultController($stateParams, $state, stackoverflowQuestionsService) {
    var vm = this;

    vm.showQuickViewTable = false;

    vm.mainViewTable = {
      items: [],
      showSpinner: true
    };

    vm.quickViewTable = {
      items: [],
      showSpinner: false
    };

    stackoverflowQuestionsService.search($stateParams.q).then(function (items) {
      vm.mainViewTable.items = items;
    }).finally(function(){
      vm.mainViewTable.showSpinner = false;
    });

    vm.onAuthorClick = function (authorId) {
      vm.showQuickViewTable = true;
      vm.quickViewTable.showSpinner = true;
      stackoverflowQuestionsService.getByAuthorId(authorId).then(function (items) {
        vm.quickViewTable.items = items;
      }).finally(function(){
        vm.quickViewTable.showSpinner = false;
      });
    };

    vm.onTagClick = function (tag) {
      vm.showQuickViewTable = true;
      vm.quickViewTable.showSpinner = true;
      stackoverflowQuestionsService.getByTag(tag).then(function (items) {
        vm.quickViewTable.items = items;
      }).finally(function(){
        vm.quickViewTable.showSpinner = false;
      });
    };

    vm.onQuestionClick = function (questionId) {
      $state.go('info', {
        questionId: questionId
      });
    }
  }
})();
