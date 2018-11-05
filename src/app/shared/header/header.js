var AppHeader =  angular.module('myApp.header', []);
AppHeader.controller('HeaderController', HeaderController);

HeaderController.$inject = ['$scope', 'UserFactory', 'UserService'];
function HeaderController($scope, UserFactory, UserService) {

  $scope.welcomeTextInfo = 'App title change';
  $scope.e = UserFactory.name

  $scope.clickHandler = function clickHandler() {
    UserFactory.setName('Alice 2');

    UserService.updateUser(function(user) {
      console.log(user);
    });
  };


}

module.exports = AppHeader;
