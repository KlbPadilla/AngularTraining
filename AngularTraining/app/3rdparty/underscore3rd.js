(function () {

    // http://www.youtube.com/watch?v=XwSFg8nqBFA
    'use strict';
    var serviceId = 'underscore';
    angular.module('app').factory(serviceId, [underscore]);
    function underscore() {

     
            return window._; // assumes underscore has already been loaded on the page
   
       

    }
})();

