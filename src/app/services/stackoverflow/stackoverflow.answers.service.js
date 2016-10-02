(function() {
  'use strict';

  angular
    .module('app')
    .factory('stackoverflowAnswersService', stackoverflowAnswers);

  /** @ngInject */
  function stackoverflowAnswers($resource, $q, $log, _, $sce, errorService, stackoverflowConfig) {

    var URL = stackoverflowConfig.url;
    var SITE = stackoverflowConfig.site;

    var questionsResource = $resource(URL + 'questions/:questionId/answers', {}, {
      get: {
        method: 'GET',
        params: {
          order: 'desc',
          sort: 'votes',
          site: SITE,
          filter: 'withbody'
        }
      }
    });

    return {
      getByQuestionId: getByQuestionId
    };

    function getByQuestionId(questionId) {
      return questionsResource.get({
        questionId: questionId
      }).$promise
        .then(onSuccess)
        .catch(onError);
    }

    function onSuccess(response) {
      try {
        return mapResponse(response);
      } catch (e) {
        $log.error(e);
        return $q.reject(e);
      }
    }

    function onError(e) {
      errorService.somethingWentWrong();
      return $q.reject(e);
    }

    function mapResponse(response) {
      if (!response.items || response.items.constructor !== Array) {
        throw new Error('incorrect response');
      }
      return _.map(response.items, function (item) {
        return {
          answer: {
            body: $sce.trustAsHtml(item.body)
          }
        };
      });
    }
  }
})();
