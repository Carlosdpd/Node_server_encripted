(function() {
  'use strict';

  angular
    .module('app.createUser')
    .controller('createUserController', createUserController);

  createUserController.$inject = ['$q', 'dataservice', 'logger'];
  /* @ngInject */
  function createUserController($q, dataservice, logger) {
    var vm = this;
    vm.news = {
      title: 'helloWorld',
      description: 'Hot Towel Angular is a SPA template for Angular developers.'
    };
    vm.messageCount = 0;
    vm.people = [];
    vm.title = 'Create User';

    vm.createAndSendJson = createAndSendJson;


    activate();


    function activate() {
      var promises = [getMessageCount(), getPeople()];
      return $q.all(promises).then(function() {
        logger.info('Activated Create User View');
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
        var object = {'username':vm.name,'password':vm.password,'first_name':vm.first_name, 'last_name':vm.last_name, 'gender':vm.gender, 'address':vm.address, 'email':vm.email}
        return dataservice.encrypt(object).then(function(data){
            return dataservice.createUser(data).then(function(data){
                vm.user = data.data;
            });
        });
    }

  }
})();
