(function() {
  'use strict';

  describe('ResultController', function(){
    var vm;
    var rootScope;
    var state;
    var stackoverflowQuestionsService;
    var stackoverflowQuestionsServiceDeffered;

    beforeEach(module('app'));
    beforeEach(inject(function(_$controller_, _$rootScope_, _$state_, _$q_, _stackoverflowQuestionsService_) {
      stackoverflowQuestionsServiceDeffered = _$q_.defer();

      spyOn(_$state_, 'go');
      spyOn(_stackoverflowQuestionsService_, 'search').and.returnValue(stackoverflowQuestionsServiceDeffered.promise);
      spyOn(_stackoverflowQuestionsService_, 'getByAuthorId').and.returnValue(stackoverflowQuestionsServiceDeffered.promise);
      spyOn(_stackoverflowQuestionsService_, 'getByTag').and.returnValue(stackoverflowQuestionsServiceDeffered.promise);

      rootScope = _$rootScope_;
      state = _$state_;
      vm = _$controller_('ResultController');
      stackoverflowQuestionsService = _stackoverflowQuestionsService_;

    }));

    it('should not show quick view table after initialization', function() {
      expect(vm.showQuickViewTable).toBe(false);
    });

    it('should show spinner in main view table after initialization', function() {
      expect(vm.mainViewTable.showSpinner).toBe(true);
    });

    it('should hide spinner in main view table when search data is fetched', function() {
      stackoverflowQuestionsServiceDeffered.resolve([]);
      rootScope.$apply();
      expect(stackoverflowQuestionsService.search).toHaveBeenCalled();
      expect(vm.mainViewTable.showSpinner).toBe(false);
    });

    it('should put fetched data into items variable for main view table', function() {
      stackoverflowQuestionsServiceDeffered.resolve('data');
      rootScope.$apply();
      expect(stackoverflowQuestionsService.search).toHaveBeenCalled();
      expect(vm.mainViewTable.items).toBe('data');
    });

    it('should hide spinner in main view table when something went wrong with fetching search data', function() {
      stackoverflowQuestionsServiceDeffered.reject();
      rootScope.$apply();
      expect(stackoverflowQuestionsService.search).toHaveBeenCalled();
      expect(vm.mainViewTable.showSpinner).toBe(false);
    });

    describe('onAuthorClick handler', function(){
      it('should show quick view table', function () {
        vm.onAuthorClick(1);
        expect(vm.showQuickViewTable).toBe(true);
      });

      it('should show spinner in quick view table', function () {
        vm.onAuthorClick(1);
        expect(vm.quickViewTable.showSpinner).toBe(true);
      });

      it('should put fetched data into items variable for quick view table', function() {
        vm.onAuthorClick(1);
        stackoverflowQuestionsServiceDeffered.resolve('data');
        rootScope.$apply();
        expect(stackoverflowQuestionsService.getByAuthorId).toHaveBeenCalled();
        expect(vm.quickViewTable.items).toBe('data');
      });

      it('should hide spinner in quick view table when data is fetched', function(){
        vm.onAuthorClick(1);
        stackoverflowQuestionsServiceDeffered.resolve([]);
        rootScope.$apply();
        expect(stackoverflowQuestionsService.getByAuthorId).toHaveBeenCalled();
        expect(vm.quickViewTable.showSpinner).toBe(false);
      });

      it('should hide spinner in quick view table when something went wrong with fetching data', function() {
        vm.onAuthorClick(1);
        stackoverflowQuestionsServiceDeffered.reject();
        rootScope.$apply();
        expect(stackoverflowQuestionsService.getByAuthorId).toHaveBeenCalled();
        expect(vm.mainViewTable.showSpinner).toBe(false);
      });
    });

    describe('onTagClick handler', function(){
      it('should show quick view table', function () {
        vm.onTagClick(1);
        expect(vm.showQuickViewTable).toBe(true);
      });

      it('should show spinner in quick view table', function () {
        vm.onTagClick(1);
        expect(vm.quickViewTable.showSpinner).toBe(true);
      });

      it('should put fetched data into items variable for quick view table', function() {
        vm.onTagClick(1);
        stackoverflowQuestionsServiceDeffered.resolve('data');
        rootScope.$apply();
        expect(stackoverflowQuestionsService.getByTag).toHaveBeenCalled();
        expect(vm.quickViewTable.items).toBe('data');
      });

      it('should hide spinner in quick view table when data is fetched', function(){
        vm.onTagClick(1);
        stackoverflowQuestionsServiceDeffered.resolve([]);
        rootScope.$apply();
        expect(stackoverflowQuestionsService.getByTag).toHaveBeenCalled();
        expect(vm.quickViewTable.showSpinner).toBe(false);
      });

      it('should hide spinner in quick view table when something went wrong with fetching data', function() {
        vm.onTagClick(1);
        stackoverflowQuestionsServiceDeffered.reject();
        rootScope.$apply();
        expect(stackoverflowQuestionsService.getByTag).toHaveBeenCalled();
        expect(vm.mainViewTable.showSpinner).toBe(false);
      });
    });

    describe('onQuestionClick handler', function () {
        it('should lead to info page', function () {
          vm.onQuestionClick(1);
          expect(state.go).toHaveBeenCalledWith('info', {questionId : 1});
        })
    });

  });
})();

