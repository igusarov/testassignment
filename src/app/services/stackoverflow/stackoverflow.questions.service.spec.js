(function () {
  'use strict';

  describe('service stackoverflowQuestions', function () {
    var stackoverflowQuestionsService;
    var $httpBackend;
    var errorService;
    var mockHttpResponse = {
      items: [
        {
          question_id: 1,
          title: "",
          body: "",
          answer_count: 1,
          tags: [""],
          owner: {
            user_id: 1,
            display_name: ""
          }
        }
      ]
    };

    beforeEach(module('app'));

    beforeEach(inject(function (_stackoverflowQuestionsService_, _$httpBackend_, _errorService_) {
      spyOn(_errorService_, 'somethingWentWrong');

      stackoverflowQuestionsService = _stackoverflowQuestionsService_;
      $httpBackend = _$httpBackend_;
      errorService = _errorService_;
    }));

    it('should be registered', function () {
      expect(stackoverflowQuestionsService).not.toEqual(null);
    });

    describe('search method', function () {

      it('should exist', function () {
        expect(stackoverflowQuestionsService.search).not.toEqual(null);
      });

      it('should return data', function () {
        $httpBackend.when('GET', /.+/).respond(200, mockHttpResponse);
        var data;
        stackoverflowQuestionsService.search(1).then(function (fetchedData) {
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
          stackoverflowQuestionsService.search(1);
          $httpBackend.flush();
          expect(errorService.somethingWentWrong).toHaveBeenCalled();
        });

        it('when http error code', function () {
          var httpResponse = {items: [{body: 'body'}]};
          $httpBackend.when('GET', /.+/).respond(400, httpResponse);
          stackoverflowQuestionsService.search(1);
          $httpBackend.flush();
          expect(errorService.somethingWentWrong).toHaveBeenCalled();
        })
      });

      describe('should return rejected promise', function () {

        it('when incorrect response', function () {
          var catchBlockHasBeenCalled = false;
          $httpBackend.when('GET', /.+/).respond(200, "wrong data");
          stackoverflowQuestionsService.search(1).catch(function () {
            catchBlockHasBeenCalled = true;
          });
          $httpBackend.flush();
          expect(catchBlockHasBeenCalled).toBeTruthy();
        });

        it('when http error code', function () {
          var catchBlockHasBeenCalled = false;
          var httpResponse = {items: [{body: 'body'}]};
          $httpBackend.when('GET', /.+/).respond(400, httpResponse);
          stackoverflowQuestionsService.search(1).catch(function () {
            catchBlockHasBeenCalled = true;
          });
          $httpBackend.flush();
          expect(catchBlockHasBeenCalled).toBeTruthy();
        })
      })

    });

    describe('getByAuthorId method', function () {

      it('should exist', function () {
        expect(stackoverflowQuestionsService.getByAuthorId).not.toEqual(null);
      });

      it('should return data', function () {
        $httpBackend.when('GET', /.+/).respond(200, mockHttpResponse);
        var data;
        stackoverflowQuestionsService.getByAuthorId(1).then(function (fetchedData) {
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
          stackoverflowQuestionsService.getByAuthorId(1);
          $httpBackend.flush();
          expect(errorService.somethingWentWrong).toHaveBeenCalled();
        });

        it('when http error code', function () {
          var httpResponse = {items: [{body: 'body'}]};
          $httpBackend.when('GET', /.+/).respond(400, httpResponse);
          stackoverflowQuestionsService.getByAuthorId(1);
          $httpBackend.flush();
          expect(errorService.somethingWentWrong).toHaveBeenCalled();
        })
      });

      describe('should return rejected promise', function () {

        it('when incorrect response', function () {
          var catchBlockHasBeenCalled = false;
          $httpBackend.when('GET', /.+/).respond(200, "wrong data");
          stackoverflowQuestionsService.getByAuthorId(1).catch(function () {
            catchBlockHasBeenCalled = true;
          });
          $httpBackend.flush();
          expect(catchBlockHasBeenCalled).toBeTruthy();
        });

        it('when http error code', function () {
          var catchBlockHasBeenCalled = false;
          var httpResponse = {items: [{body: 'body'}]};
          $httpBackend.when('GET', /.+/).respond(400, httpResponse);
          stackoverflowQuestionsService.getByAuthorId(1).catch(function () {
            catchBlockHasBeenCalled = true;
          });
          $httpBackend.flush();
          expect(catchBlockHasBeenCalled).toBeTruthy();
        })
      })

    });

    describe('getByTag method', function () {

      it('should exist', function () {
        expect(stackoverflowQuestionsService.getByTag).not.toEqual(null);
      });

      it('should return data', function () {
        $httpBackend.when('GET', /.+/).respond(200, mockHttpResponse);
        var data;
        stackoverflowQuestionsService.getByTag(1).then(function (fetchedData) {
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
          stackoverflowQuestionsService.getByTag(1);
          $httpBackend.flush();
          expect(errorService.somethingWentWrong).toHaveBeenCalled();
        });

        it('when http error code', function () {
          var httpResponse = {items: [{body: 'body'}]};
          $httpBackend.when('GET', /.+/).respond(400, httpResponse);
          stackoverflowQuestionsService.getByTag(1);
          $httpBackend.flush();
          expect(errorService.somethingWentWrong).toHaveBeenCalled();
        })
      });

      describe('should return rejected promise', function () {

        it('when incorrect response', function () {
          var catchBlockHasBeenCalled = false;
          $httpBackend.when('GET', /.+/).respond(200, "wrong data");
          stackoverflowQuestionsService.getByTag(1).catch(function () {
            catchBlockHasBeenCalled = true;
          });
          $httpBackend.flush();
          expect(catchBlockHasBeenCalled).toBeTruthy();
        });

        it('when http error code', function () {
          var catchBlockHasBeenCalled = false;
          var httpResponse = {items: [{body: 'body'}]};
          $httpBackend.when('GET', /.+/).respond(400, httpResponse);
          stackoverflowQuestionsService.getByTag(1).catch(function () {
            catchBlockHasBeenCalled = true;
          });
          $httpBackend.flush();
          expect(catchBlockHasBeenCalled).toBeTruthy();
        })
      })

    });

    describe('getById method', function () {

      it('should exist', function () {
        expect(stackoverflowQuestionsService.getById).not.toEqual(null);
      });

      it('should return data', function () {
        $httpBackend.when('GET', /.+/).respond(200, mockHttpResponse);
        var data;
        stackoverflowQuestionsService.getById(1).then(function (fetchedData) {
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
          stackoverflowQuestionsService.getById(1);
          $httpBackend.flush();
          expect(errorService.somethingWentWrong).toHaveBeenCalled();
        });

        it('when http error code', function () {
          var httpResponse = {items: [{body: 'body'}]};
          $httpBackend.when('GET', /.+/).respond(400, httpResponse);
          stackoverflowQuestionsService.getById(1);
          $httpBackend.flush();
          expect(errorService.somethingWentWrong).toHaveBeenCalled();
        })
      });

      describe('should return rejected promise', function () {

        it('when incorrect response', function () {
          var catchBlockHasBeenCalled = false;
          $httpBackend.when('GET', /.+/).respond(200, "wrong data");
          stackoverflowQuestionsService.getById(1).catch(function () {
            catchBlockHasBeenCalled = true;
          });
          $httpBackend.flush();
          expect(catchBlockHasBeenCalled).toBeTruthy();
        });

        it('when http error code', function () {
          var catchBlockHasBeenCalled = false;
          var httpResponse = {items: [{body: 'body'}]};
          $httpBackend.when('GET', /.+/).respond(400, httpResponse);
          stackoverflowQuestionsService.getById(1).catch(function () {
            catchBlockHasBeenCalled = true;
          });
          $httpBackend.flush();
          expect(catchBlockHasBeenCalled).toBeTruthy();
        })
      })

    });

  });
})();

