angular.module('myApp.service', [])
		.service('UserService', UserService);

// UserService.$inject = ['$scope', '$state'];
function UserService() {

  var that = this;
  this.User = {name: '...'}

  this.updateUser = function(cb) {
    this.User = {
      name: 'Alice name'
    }

    cb(that.User);
  }

}