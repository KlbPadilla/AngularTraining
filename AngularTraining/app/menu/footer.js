define(function (require) {
    var ko = require('knockout');
    var ctor = function () {
        this.title = ko.observable('Attendance by 10Geek Software.');
    };

    ctor.prototype.activate = function () {
      
    };
  
    return ctor;
});
