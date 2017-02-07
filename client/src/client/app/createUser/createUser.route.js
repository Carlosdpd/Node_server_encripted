(function() {
  'use strict';

  angular
    .module('app.createUser')
    .run(appRun);

  appRun.$inject = ['routerHelper'];
  /* @ngInject */
  function appRun(routerHelper) {
    routerHelper.configureStates(getStates());
  }

  function getStates() {
    return [
      {
        state: 'createUser',
        config: {
          url: '/createuser',
          templateUrl: 'app/createUser/createUser.html',
          controller: 'createUserController',
          controllerAs: 'vm',
          title: 'createUser',
          settings: {
            nav: 1,
            content: '<i class="fa fa-dashboard"></i> Create User'
          }
        }
      }
    ];
  }
})();
