var AppHeader =  angular.module('myApp.header', []);
AppHeader.controller('HeaderController', HeaderController);

HeaderController.$inject = ['$scope', 'UserFactory'];
function HeaderController($scope, UserFactory) {

  $scope.welcomeTextInfo = 'App title change';

  $scope.clickHandler = function clickHandler() {
    UserFactory.setName('Alice 2');
  };
}

module.exports = AppHeader;
