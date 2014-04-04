(function () {
    'use strict';
    var controllerId = 'customer';
    angular.module('app').controller(controllerId, ['$scope', '$modalInstance', 'applicationData', 'common', 'dataservice', customer]);
    function customer($scope, $modalInstance, applicationData, common, dataservice) {
        var c = applicationData.getDataItem(); //currentCustomer

        var wipEntityKey = undefined;
        var entityName = 'Customer';

        $scope.c = c;

        $scope.ok = function () {
            $modalInstance.close($scope.c);
        };
        $scope.cancel = function () {
            $modalInstance.dismiss('cancel');
        };

        function autoStoreWip(immediate) {
            common.debouncedThrottle(controllerId, storeWipEntity, 1000, immediate);
        }

        function onEveryChange() {
            $scope.$on('dataservice.entitiesChanged',
                function (event, data) {
                    autoStoreWip();
                });
        }

        function onDestroy() {
            $scope.$on('$destroy', function () {
                autoStoreWip(true);
                $scope.cancel();
            });
        }

        function onHasChanges() {
            $scope.$on('dataservice.hasChangesChanged',
                function (event, data) {
                    $scope.c.hasChanges = data.hasChanges;
                });
        }

        function removeWipEntity() {
            dataservice.zStorageWip.removeWipEntity(wipEntityKey);
        }

        // hacer el save aca, desligar el otro controller

        //function save() {
        //    if (!canSave()) { return $q.when(null); } // Must return a promise

        //    vm.isSaving = true;
        //    return datacontext.save().then(function (saveResult) {
        //        vm.isSaving = false;
        //        datacontext.speaker.calcIsSpeaker();
        //        removeWipEntity();
        //        helper.replaceLocationUrlGuidWithId(vm.session.id);
        //    }, function (error) {
        //        vm.isSaving = false;
        //    });
        //}

        function storeWipEntity() {
            if (!$scope.c) return;
            var description = $scope.c.FirstName || '[New Customer]' + $scope.c.CustomerId;
            wipEntityKey = dataservice.zStorageWip.storeWipEntity($scope.c, wipEntityKey, entityName, description);
        }
    }
})();