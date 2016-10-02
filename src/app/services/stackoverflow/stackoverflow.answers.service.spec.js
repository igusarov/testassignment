(function () {
  'use strict';

  describe('service stackoverflowAnswers', function () {
    var stackoverflowAnswersService;
    var $httpBackend;
    var errorService;

    beforeEach(module('app'));

    beforeEach(inject(function (_stackoverflowAnswersService_, _$httpBackend_, _errorService_) {
      spyOn(_errorService_, 'somethingWentWrong');

      stackoverflowAnswersService = _stackoverflowAnswersService_;
      $httpBackend = _$httpBackend_;
      errorService = _errorService_;
    }));

    it('should be registered', function () {
      expect(stackoverflowAnswersService).not.toEqual(null);
    });

    describe('getByQuestionId method', function () {

      it('should exist', function () {
        expect(stackoverflowAnswersService.getByQuestionId).not.toEqual(null);
      });

      it('should return data', function () {
        var httpResponse = {items: [{body: 'body'}]};
        $httpBackend.when('GET', /.+/).respond(200, httpResponse);
        var data;
        stackoverflowAnswersService.getByQuestionId(1).then(function (fetchedData) {
          data = fetchedData;
        });
        $httpBackend.flush();
        expect(data).toEqual(jasmine.any(Array));
        expect(data.length === 1).toBeTruthy();
        expect(data[0]).toEqual(jasmine.any(Object));
      });

      describe('should call errorService.somethingWentWrong', function () {

        it('when incorrect response', function () {
          $httpBackend.when('GET', /.+/).respond(200, "wrong data");
          stackoverflowAnswersService.getByQuestionId(1);
          $httpBackend.flush();
          expect(errorService.somethingWentWrong).toHaveBeenCalled();
        });

        it('when http error code', function () {
          var httpResponse = {items: [{body: 'body'}]};
          $httpBackend.when('GET', /.+/).respond(400, httpResponse);
          stackoverflowAnswersService.getByQuestionId(1);
          $httpBackend.flush();
          expect(errorService.somethingWentWrong).toHaveBeenCalled();
        })
      });

      describe('should return rejected promise', function () {

        it('when incorrect response', function () {
          var catchBlockHasBeenCalled = false;
          $httpBackend.when('GET', /.+/).respond(200, "wrong data");
          stackoverflowAnswersService.getByQuestionId(1).catch(function () {
            catchBlockHasBeenCalled = true;
          });
          $httpBackend.flush();
          expect(catchBlockHasBeenCalled).toBeTruthy();
        });

        it('when http error code', function () {
          var catchBlockHasBeenCalled = false;
          var httpResponse = {items: [{body: 'body'}]};
          $httpBackend.when('GET', /.+/).respond(400, httpResponse);
          stackoverflowAnswersService.getByQuestionId(1).catch(function () {
            catchBlockHasBeenCalled = true;
          });
          $httpBackend.flush();
          expect(catchBlockHasBeenCalled).toBeTruthy();
        })
      })

    });

  });
})();

