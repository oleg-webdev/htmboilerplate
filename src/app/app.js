require('angular');
require('angular-ui-router');
require('angular-aria');
require('angular-animate');
require('angular-material');

require('./services/UserFactory');
require('./services/UserService');
var AppHeader = require('./shared/header/header.js');
require('./components/home/home.js');
require('./components/about/about.js');
require('./partials/PartialHomeController');


var app = angular.module('myApp', [
	'ui.router','ngMaterial','myApp.home', 'myApp.about', AppHeader.name,
	'myApp.partialhome', 'myApp.factory', 'myApp.service'
]);

app.config(function($stateProvider, $urlRouterProvider) {
	
	$urlRouterProvider.otherwise("/");

	$stateProvider
		.state('home', {
			url: "/",
			views : {
				"" : {
					templateUrl:"app/components/home/home.html"
				},
				"header@home":{
					templateUrl:"app/shared/header/header.html"
				}
			}
		})

		// nested list with custom controller
    .state('home.list', {
			url: 'list',
			templateUrl: 'app/partials/partial-home.html',
			controller: 'PartialHomeController'
		})

		// nested list with just some random string data
		.state('home.paragraph', {
				url: 'paragraph',
				template: 'Lorem Ipsum.',
				controller: 'PartialHomeControllerParagraph'
		})

		.state('about', {
			url: "/about",
			views : {
				"" : {
					templateUrl:"app/components/about/about.html"
				},
				"header@about":{
					templateUrl:"app/shared/header/header.html"
				}
			}
		});
});