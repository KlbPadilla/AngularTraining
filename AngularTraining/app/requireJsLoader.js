require.config({
    shim: {
        'facebook': {
            exports: 'FB'
        }
    },
    paths: {
        'facebook': '//connect.facebook.net/en_US/all'
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



        '../Scripts/restangular.min.js',
     
        '../app/services/repositories/repository.customer.js',

  
        '../app/services/repositories/repository.prime.js',

          '../app/landingPage/landing.js',
       '../app/landingPage/customer.js'
 


     //'app/services/facebook.js'





       
],
function () {
    angular.bootstrap(document, ['app']);
});