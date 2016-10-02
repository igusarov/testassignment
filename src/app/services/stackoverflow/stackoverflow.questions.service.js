(function() {
  'use strict';

  angular
    .module('app')
    .factory('stackoverflowQuestionsService', stackoverflowQuestions);

  /** @ngInject */
  function stackoverflowQuestions($resource, $q, $log, _, $sce, errorService, stackoverflowConfig) {

    var URL = stackoverflowConfig.url;
    var PAGE_SIZE = stackoverflowConfig.pageSize;
    var SITE = stackoverflowConfig.site;

    var searchResource = $resource(URL + 'search', {}, {
      get: {
        method: 'GET',
        params: {
          order: 'desc',
          sort: 'activity',
          site: SITE,
          pagesize: PAGE_SIZE
        }
      }
    });

    var usersResource = $resource(URL + 'users/:userId/questions', {}, {
      get: {
        method: 'GET',
        params: {
          order: 'desc',
          sort: 'votes',
          site: SITE,
          pagesize: PAGE_SIZE
        }
      }
    });

    var tagsResource = $resource(URL + 'tags/:tag/faq', {}, {
      get: {
        method: 'GET',
        params: {
          site: SITE,
          pagesize: PAGE_SIZE
        }
      }
    });

    var questionsResource = $resource(URL + 'questions/:questionId', {}, {
      get: {
        method: 'GET',
        params: {
          site: SITE,
          filter: 'withbody'
        }
      }
    });

    return {
      search: search,
      getByAuthorId: getByAuthorId,
      getByTag: getByTag,
      getById: getById
    };

    function search(query) {
      return searchResource.get({
        intitle: query
      }).$promise
        .then(onSuccess)
        .catch(onError);
    }

    function getByAuthorId(authorId) {
      return usersResource.get({
        userId: authorId
      }).$promise
        .then(onSuccess)
        .catch(onError);
    }

    function getByTag(tag) {
      return tagsResource.get({
        tag: tag
      }).$promise
        .then(onSuccess)
        .catch(onError);
    }

    function getById(questionId) {
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
          author: {
            id: item.owner.user_id,
            name: item.owner.display_name
          },
          question: {
            id: item.question_id,
            title: $sce.trustAsHtml(item.title),
            body: item.body ? $sce.trustAsHtml(item.body) : null
          },
          answer_count: item.answer_count,
          tag: item.tags[0],
          tags: item.tags
        };
      });
    }
  }
})();
