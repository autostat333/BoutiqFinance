module.exports = function($stateProvider, $urlRouterProvider)
	{

    $urlRouterProvider
    	.otherwise('/main')
    //	.when('/main','/main/controllers/');


    $stateProvider
    .state('main',
        {
        templateUrl:'./app/app/views/main/main.html',
        controller:require('./controllers/main/main.js'),
        url:'/main'
        })
  	
    }

module.exports.$inject = ['$stateProvider', '$urlRouterProvider'];