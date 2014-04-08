(function () {
    'use strict';
    var controllerId = 'landing';
    angular.module('app').controller(controllerId, ['$scope', '$modal', 'common', 'dataservice', 'applicationData', landing]);
    function landing($scope, $modal, common, dataservice, applicationData) {

        var repoCustomer = dataservice.getRepo('repository.customer');

        var getLogFn = common.logger.getLogFn;
        var log = getLogFn();
        $scope.add = add;
        $scope.logout = logout;
        $scope.activate = activate;
        $scope.title = 'Angular JS Training';
        $scope.customer = '';


        activate();
        function activate() {
            common.activateController([], controllerId).
            then(function () {
                log('Welcome');
            });
        }
        function openModal() {
            var modalInstance = $modal.open({
                templateUrl: '/app/landingPage/customer.html',
                controller: 'customer',
            });
            modalInstance.result.then(function (newCustomer) {
                return repoCustomer.create(newCustomer).then(function (data) {
                    var customer = data.entities[0];
                    var firstname = customer.FirstName;
                    log('Thanks ' + firstname);
                });
            });
        }
        function add() {
            var id = breeze.core.getUuid();
            applicationData.setDataItem({ CustomerId: id, IsCompany: false, FirstName: '', MainEmail: '', FacebookPage: '', TwitterPage: '', LinkedinPage: '', SkypeId: '', GooglePlusId: '', LastName: '', DateOfBirth: '', SexGender: '', imagePath: 'http://www.gravatar.com/avatar/?d=mm', Notes: '', Paid: false, Phone: '', Address1: '', Address2: '', City: '', State: '' });
            openModal();
        };

        function logout() {
            document.location.href = "https://www.google.com/accounts/Logout?continue=https://appengine.google.com/_ah/logout?continue=http://localhost:12499/index.html";
        };


    }
})();