(function() {
  'use strict';

  angular
    .module('app')
    .controller('InfoController', InfoController);

  /** @ngInject */
  function InfoController($stateParams, stackoverflowQuestionsService, stackoverflowAnswersService) {
    var vm = this;

    stackoverflowQuestionsService.getById($stateParams.questionId).then(function (items) {
      vm.question = items[0];
    });

    stackoverflowAnswersService.getByQuestionId($stateParams.questionId).then(function (items) {
      vm.answers = items;
    })
  }
})();
