(function () {

   
    'use strict';
    var serviceId = 'lowdash';
    angular.module('app').factory(serviceId, [lowdash]);
    function lowdash() {

     
        return window._; // assumes lowdash has already been loaded on the page
   
       

    }
})();

