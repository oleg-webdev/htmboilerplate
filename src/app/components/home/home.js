angular.module('myApp.home', [])
	.controller('homeCtrl', homeCtrl);

homeCtrl.$inject = ['$scope', 'UserFactory', 'UserService'];
function homeCtrl($scope, UserFactory, UserService) {

	$scope.welcomeText = 'Home Router!';
	$scope.userName = UserFactory.name;
	$scope.usr = UserService.User;

	$scope.$watch(function(){return UserFactory.name}, function(value) {
		$scope.userName = value;
	});

	$scope.$watch(function(){return UserService.User}, function(value) {
		$scope.usr = value;
	});

}