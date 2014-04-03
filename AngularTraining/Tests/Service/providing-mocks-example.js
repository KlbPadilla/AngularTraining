// a service.
angular.module('myApp').factory('foo', function () {
  return {
    bar: function(msg) {
      // do something here.
    }
  };
});

// a service that depends on the other service.
angular.module('myApp').factory('myService', function(foo) {
  return {
    test: function(msg) {
      foo.bar(msg);
    }
  };
});