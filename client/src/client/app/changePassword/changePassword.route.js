(function() {
  'use strict';

  angular
    .module('app.changePassword')
    .run(appRun);

  appRun.$inject = ['routerHelper'];
  /* @ngInject */
  function appRun(routerHelper) {
    routerHelper.configureStates(getStates());
  }

  function getStates() {
    return [
      {
        state: 'changePassword',
        config: {
          url: '/changePassword',
          templateUrl: 'app/changePassword/changePassword.html',
          controller: 'changePasswordController',
          controllerAs: 'vm',
          title: 'changePassword',
          settings: {
            nav: 1,
            content: '<i class="fa fa-dashboard"></i> Change Password'
          }
        }
      }
    ];
  }
})();
