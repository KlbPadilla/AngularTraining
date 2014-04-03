require.config({
    baseUrl: '/app',
    urlArgs: 'v=1.0',
    appDir: '',
    paths:
    {
        // Configure alias to full paths
        //'auth': './quizzer/authentication',
        //'quiz': './quizzer/quiz',
        //'utils': './mindspace/utils'
    },
    shim:
    {
    }
});
require(
[
        '../scripts/amplify.js',
        '../Scripts/angular.breeze.storagewip.js',
        '../app/config',
        '../app/config.breeze.js',
        '../app/config.exceptionHandler',
        '../app/config.route',
        '../app/common/logger',
        '../app/common/spinner',
     

         '../Scripts/ui-bootstrap-tpls-0.10.0.js',
    
        '../app/services/utilities.js',
        '../app/layout/shell',
        '../app/layout/sidebar',
        '../app/layout/headerbar',
        '../app/layout/leftpanel',
        '../app/layout/rightpanel',
        '../app/services/directives',
        '../app/services/entityManagerFactory',
        '../app/services/dataservice',
        '../app/services/applicationData',
        '../app/services/utilities',
        '../app/services/uow',
        '../app/services/model',
        '../app/angularTraining/customer/customers',
        '../app/angularTraining/customer/customer',


        '../Scripts/restangular.min.js',
     
        '../app/services/repositories/repository.customer.js',

        '../app/dashboard/dashboard.js',
        '../app/services/repositories/repository.prime.js',


        '../app/angularTraining/customer/customersView'
 








       
],
function () {
    angular.bootstrap(document, ['app']);
});