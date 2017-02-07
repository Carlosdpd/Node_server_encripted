(function() {
  'use strict';

  angular
    .module('app.changePassword')
    .controller('changePasswordController', changePasswordController);

  changePasswordController.$inject = ['$q', 'dataservice', 'logger'];
  /* @ngInject */
  function changePasswordController($q, dataservice, logger) {
    var vm = this;
    vm.news = {
      title: 'helloWorld',
      description: 'Hot Towel Angular is a SPA template for Angular developers.'
    };
    vm.messageCount = 0;
    vm.people = [];
    vm.title = 'Change Password';

    vm.createAndSendJson = createAndSendJson;


    activate();


    function activate() {
      var promises = [getMessageCount(), getPeople()];
      return $q.all(promises).then(function() {
        logger.info('Activated Change Password View');
      });
    }

    function getMessageCount() {
      return dataservice.getMessageCount().then(function(data) {
        vm.messageCount = data;
        return vm.messageCount;
      });
    }

    function getPeople() {
      return dataservice.getPeople().then(function(data) {
        vm.people = data;
        return vm.people;
      });
    }

    function createAndSendJson(){
        var object = {'username':vm.name, 'password':vm.password, 'newPassword':vm.newPassword}
        return dataservice.encrypt(object).then(function(data){
            return dataservice.changePassword(data).then(function(data){
                vm.user = data.data;
            });
        });
    }

  }
})();
