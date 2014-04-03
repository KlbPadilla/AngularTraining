(function () {
    'use strict';
    var serviceId = 'applicationData';
    angular.module('app').factory(serviceId, ['utilities', 'lowdash', applicationData]);
    function applicationData(util, _) {

        // values
        var letters = [
        { key: 0, value: 'a' }, { key: 1, value: 'b' }, { key: 2, value: 'c' }, { key: 3, value: 'd' }, { key: 4, value: 'f' }, { key: 5, value: 'g' }, { key: 6, value: 'h' }, { key: 7, value: 'i' }, { key: 8, value: 'j' }, { key: 9, value: 'k' }, { key: 10, value: 'l' }, { key: 11, value: 'm' }, { key: 12, value: 'n' }, { key: 13, value: 'o' }, { key: 14, value: 'p' }, { key: 15, value: 'q' }, { key: 16, value: 'r' }, { key: 17, value: 's' }, { key: 18, value: 't' }, { key: 19, value: 'u' }, { key: 20, value: 'v' }, { key: 21, value: 'w' }, { key: 22, value: 'x' }, { key: 23, value: 'y' }, { key: 24, value: 'z' }
        ];

        // constants
        var doWorkOffline;

        // Moving variables
        var dataItems = [];
        var dataItem;
        return {
            getDataItems: function () {
                return dataItems;
            },
            setDataItems: function (value) {
                dataItems = value;
            },
            getDataItem: function () {
                return dataItem;
            },
            setDataItem: function (value) {
                dataItem = value;
            },
            getDoWorkOffline: function () {
                return doWorkOffline;
            },
            setDoWorkOffline: function (value) {
                doWorkOffline = value;
            },
            letters: letters
        };
    }
})();
