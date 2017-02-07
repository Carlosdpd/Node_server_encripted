(function() {
  'use strict';

  angular
    .module('app.core')
    .factory('dataservice', dataservice);

  dataservice.$inject = ['$http', '$q', 'exception', 'logger'];
  /* @ngInject */
  function dataservice($http, $q, exception, logger) {
    var service = {
      getPeople: getPeople,
      getMessageCount: getMessageCount,
      encrypt: encrypt,
      login: login,
      changePassword: changePassword,
      createUser: createUser
    };

    return service;

    function getMessageCount() { return $q.when(72); }

    function getPeople() {
      return $http.get('/api/people')
        .then(success)
        .catch(fail);

      function success(response) {
        return response.data;
      }

      function fail(e) {
        return exception.catcher('XHR Failed for getPeople')(e);
      }


    }

    function encrypt(object){
        return $http.post('http://localhost:8000/encrypt', object)
        .then(function(data){
            return data.data;
        }).catch(function(error){
            return error;
        })
    }

    function login (object){
        return $http.post('http://localhost:8000/user/login', object)
        .then(function(data){
            return data;
        }).catch(function(error){
            return error;
        })
    }

    function changePassword (object){
        return $http.put('http://localhost:8000/user/changepassword', object)
        .then(function(data){
            return data;
        }).catch(function(error){
            return error;
        })
    }

    function createUser (object){
        return $http.post('http://localhost:8000/user/createuser', object)
        .then(function(data){
            return data;
        }).catch(function(error){
            return error;
        })
    }
  }
})();
