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
        '../app/authentication/authDataservice.js',
        '../app/authentication/header.js',
        '../app/authentication/login.js',
        '../app/authentication/logout.js',
        '../Scripts/restangular.min.js',
        '../app/services/repositories/repository.address.js',
        '../app/services/repositories/repository.addressType.js',
        '../app/services/repositories/repository.appUser.js',
        '../app/services/repositories/repository.customer.js',
        '../app/services/repositories/repository.email.js',
        '../app/services/repositories/repository.emailType.js',
        '../app/services/repositories/repository.employee.js',
        '../app/services/repositories/repository.invoice.js',
        '../app/services/repositories/repository.invoiceDetail.js',
        '../app/services/repositories/repository.invoiceType.js',
        '../app/services/repositories/repository.message.js',
        '../app/services/repositories/repository.phone.js',
        '../app/services/repositories/repository.phoneCall.js',
        '../app/services/repositories/repository.phoneCallType.js',
        '../app/services/repositories/repository.phoneType.js',
        '../app/services/repositories/repository.product.js',
        '../app/services/repositories/repository.productCategory.js',
        '../app/dashboard/dashboard.js',
        '../app/services/repositories/repository.prime.js',


        '../app/angularTraining/customer/customersView',
        '../app/angularTraining/customer/customersRestangularBreeze',
        '../app/angularTraining/customer/customersRestangularMongoDb'









       
],
function () {
    angular.bootstrap(document, ['app']);
});