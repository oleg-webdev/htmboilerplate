var partialhome = angular.module('myApp.partialhome', []);

partialhome.controller('PartialHomeController', PartialHomeController);

PartialHomeController.$inject = ['$scope'];
function PartialHomeController($scope) {

  $scope.list = ['first', 'second'];

}


partialhome.controller('PartialHomeControllerParagraph', PartialHomeControllerParagraph);

PartialHomeControllerParagraph.$inject = ['$scope'];
function PartialHomeControllerParagraph($scope) {

  console.log('paragraph');

}