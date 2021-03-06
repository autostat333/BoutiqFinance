module.exports = function($stateProvider, $urlRouterProvider)
	{

    $urlRouterProvider
    	.otherwise('/main/sales')
    //	.when('/main','/main/controllers/');


    $stateProvider
    .state('main',
        {
        templateUrl:'./app/app/views/main/main.html',
        controller:require('./controllers/main/main.js'),
        url:'/main'
        })


        //CHILDS
        .state('main.sales',
            {
            templateUrl:'./app/app/views/sales/sales.html',
            controller:require('./controllers/sales/SalesCntr.js'),
            url:'/sales'
            })
        .state('main.store',
            {
                templateUrl:'./app/app/views/store/store.html',
                controller:require('./controllers/store/StoreCntr.js'),
                url:'/store'
            })
        .state('main.reports',
            {
                templateUrl:'./app/app/views/reports/reports.html',
                controller:require('./controllers/reports/ReportsCntr.js'),
                url:'/reports'
            })
        .state('main.settings',
            {
                templateUrl:'./app/app/views/settings/settings.html',
                controller:require('./controllers/settings/SettingsCntr.js'),
                url:'/settings'
            })
        .state('main.workers',
            {
                templateUrl:'./app/app/views/workers/workers.html',
                controller:require('./controllers/workers/WorkersCntr.js'),
                url:'/workers'
            })
    }

module.exports.$inject = ['$stateProvider', '$urlRouterProvider'];