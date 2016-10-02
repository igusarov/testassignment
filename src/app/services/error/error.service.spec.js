(function () {
  'use strict';

  describe('service error', function () {
    var errorService;
    var toastr;

    beforeEach(module('app'));

    beforeEach(inject(function (_errorService_, _toastr_) {
      spyOn(_toastr_, 'error').and.callThrough();

      errorService = _errorService_;
      toastr = _toastr_;
    }));

    it('should be registered', function () {
      expect(errorService).not.toEqual(null);
    });

    describe('somethingWentWrong method', function () {

      it('should exist', function () {
        expect(errorService.somethingWentWrong).not.toEqual(null);
      });

      it('should call toastr.error method', function () {
        errorService.somethingWentWrong();
        expect(toastr.error).toHaveBeenCalled();
      });

    });

  });
})();
