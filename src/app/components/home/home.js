angular.module('myApp.home', [])
	.controller('homeCtrl', homeCtrl);

homeCtrl.$inject = ['$scope', 'UserFactory'];
function homeCtrl($scope, UserFactory) {

	$scope.welcomeText = 'Home Router!';
	$scope.userName = UserFactory.name;

	$scope.$watch(function(){return UserFactory.name}, function(value) {
		$scope.userName = value;
	});

}