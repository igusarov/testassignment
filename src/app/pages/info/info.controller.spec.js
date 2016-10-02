(function () {
  'use strict';

  describe('InfoController', function () {
    var vm;
    var rootScope;
    var stackoverflowQuestionsService;
    var stackoverflowQuestionsServiceDeffered;
    var stackoverflowAnswersService;
    var stackoverflowAnswersServiceDeffered;
    var stateParams = {
      questionId: 1
    };

    beforeEach(module('app'));

    beforeEach(function () {
      module(function ($provide) {
        $provide.value('$stateParams', stateParams);
      })
    });

    beforeEach(inject(function (_$controller_, _$rootScope_, _$q_, _stackoverflowQuestionsService_, _stackoverflowAnswersService_) {
      stackoverflowQuestionsServiceDeffered = _$q_.defer();
      stackoverflowAnswersServiceDeffered = _$q_.defer();

      spyOn(_stackoverflowQuestionsService_, 'getById').and.returnValue(stackoverflowQuestionsServiceDeffered.promise);
      spyOn(_stackoverflowAnswersService_, 'getByQuestionId').and.returnValue(stackoverflowAnswersServiceDeffered.promise);

      rootScope = _$rootScope_;
      vm = _$controller_('InfoController');
      stackoverflowQuestionsService = _stackoverflowQuestionsService_;
      stackoverflowAnswersService = _stackoverflowAnswersService_;
    }));

    it('should put fetched data from question service into property question', function () {
      stackoverflowQuestionsServiceDeffered.resolve(['data']);
      rootScope.$apply();
      expect(stackoverflowQuestionsService.getById).toHaveBeenCalled();
      expect(vm.question).toBe('data');
    });

    it('should put fetched data from answers service into property answers', function () {
      stackoverflowAnswersServiceDeffered.resolve('data');
      rootScope.$apply();
      expect(stackoverflowAnswersService.getByQuestionId).toHaveBeenCalled();
      expect(vm.answers).toBe('data');
    });
  });
})();

