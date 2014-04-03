define(function (require) {
    var ko = require('knockout');
    var ctor = function () {

        this.timeStamp = ko.observable(0);
        this.menuButtons = ko.observableArray([
        { label: " Attendees ", classu: "btn btn-primary dropdown-toggle ", id: '1', subMenu: [{ sublabel: " Attendees ", icon: 'fa fa-user', a: "#Attendees", id: '1' }, { sublabel: " dos ", icon: 'fa fa-bars', a: "#Dos", id: '1' }, { sublabel: " tres ", icon: 'fa fa-bar-chart-o', a: "#perico", id: '1' }] },
        { label: " Meetings ", classu: "btn btn-info dropdown-toggle ", id: '2', subMenu: [{ sublabel: " 1 ", icon: 'fa fa-user', a: "#AttendanceSheet", id: '2' }, { sublabel: " 2 ", icon: 'fa fa-beer', a: "#Cuatro", id: '2' }] }
        ]);
    };

    ctor.prototype.attached = function (view) {
        //var that = this;
        //$('.dropdown-toggle').hover(function (data) {
        //    var a = that.timeStamp();
        //    var b = data.timeStamp;
        //    if ((b - a) > 1000) {
        //        $(data.toElement).trigger("click");
        //        that.timeStamp(data.timeStamp);
        //    }
        //});
    };

    ctor.prototype.compositionComplete = function () {
    };

    return ctor;
});
