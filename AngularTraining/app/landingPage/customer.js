(function () {
    'use strict';
    var controllerId = 'customer';
    angular.module('app').controller(controllerId, ['$scope', '$modalInstance', 'applicationData', customer]);
    function customer($scope, $modalInstance, applicationData) {

        var c = applicationData.getDataItem();
        $scope.c = c;

        $scope.ok = function () {
            $modalInstance.close($scope.c);
        };

        $scope.cancel = function () {
            $modalInstance.dismiss('cancel');
        };

    }
})();