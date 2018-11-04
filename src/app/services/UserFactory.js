angular.module('myApp.serv', [])
		.factory('UserFactory', UserFactory);

// UserFactory.$inject = ['$scope', '$state'];
function UserFactory() { //
  var UserData = { name: '...' };

  UserData.setName = function(name = 'Alice') {
    UserData.name = name
  }

  return UserData;
}