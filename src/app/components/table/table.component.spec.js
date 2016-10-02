(function () {
  'use strict';

  describe('component table controller', function () {
    var controller;

    beforeEach(module('app'));

    beforeEach(inject(function ($rootScope, $compile) {
      var scope = $rootScope.$new();
      var element = angular.element('<table-component></table-component>');
      element = $compile(element)(scope);
      scope.$apply();
      controller = element.controller('tableComponent');
    }));


    it('should set property propertyName as null by default', function () {
      expect(controller.propertyName).toBeDefined();
      expect(controller.propertyName).toBe(null);
    });

    it('should set property reverse as false by default', function () {
      expect(controller.reverse).toBeDefined();
      expect(controller.reverse).toBe(false);
    });

    describe('method sortBy', function () {
      it('should exist', function () {
        expect(controller.sortBy).toBeDefined();
      });

      it('should set property propertyName', function () {
        controller.sortBy('thisIsName');
        expect(controller.propertyName).toBe('thisIsName');
      });

      it('should set property propertyName', function () {
        controller.sortBy('thisIsName');
        expect(controller.propertyName).toBe('thisIsName');
      });

      it('should set property reverse in the right order', function () {
        controller.sortBy('thisIsName');
        expect(controller.reverse).toBe(false);
        controller.sortBy('thisIsName');
        expect(controller.reverse).toBe(true);
        controller.sortBy('thisIsName');
        expect(controller.reverse).toBe(false);
        controller.sortBy('thisIsAnotherName');
        expect(controller.reverse).toBe(false);
      });

    })

  });
})();
