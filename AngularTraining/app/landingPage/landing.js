(function () {
    'use strict';
    var controllerId = 'landing';

    angular.module('app').controller(controllerId, ['$scope', '$modal', 'common', 'dataservice', 'applicationData', landing]);
    function landing($scope, $modal, common, dataservice, applicationData) {


        var repo = dataservice.getRepo('repository.customer');

        var getLogFn = common.logger.getLogFn;
        var log = getLogFn();
        $scope.popup = popup;
        $scope.add = add;
        $scope.activate = activate;
        $scope.title = 'Angular JS Training';
        $scope.customer = '';
        $scope.customers = [];
        $scope.filteredCustomers = [];
        $scope.filteredCount = 0;
        $scope.orderby = 'lastName';
        $scope.reverse = false;
        //paging
        $scope.totalRecords = 0;
        $scope.pageSize = 10;
        $scope.currentPage = 1;



        activate();
        function activate() {
            createWatches();
            common.activateController([getCustomers()], controllerId).
            then(function () {
                log('Activated Customer View');
            });
        }

        function getCustomers() {
            var include = null;
            applicationData.setDoWorkOffline = false;
            return repo.getPagedCustomers(include, $scope.currentPage, $scope.pageSize).then(function (data) {

                $scope.totalRecords = data.totalRecords;
                $scope.customers = data.jsonResults;
            });
        }

        function getCustomerById(id) {
            return repo.getCustomerById(id).then(function (data) {
                return $scope.customer = data;
            });
        }
        function openModal(data) {
            applicationData.setDataItem(data);
            var modalInstance = $modal.open({
                templateUrl: '/app/angularTraining/customer/customer.html',
                controller: 'customer',
                resolve: {
                    items: function () {
                        // return customer.items;
                    }
                }
            });
            modalInstance.result.then(function (selectedCustomer) {
                debugger;
                // customer.selected = selectedItem;
            }, function () {
                // $log.info('Modal dismissed at: ' + new Date());
            });
        }
        function popup(selectedCustomer) {
            debugger;
            if (selectedCustomer && selectedCustomer.CustomerId) {
                getCustomerById(selectedCustomer.CustomerId)
                .then(function (data) {
                    openModal(data);
                });
            }
        }

        function add() {
            var that = this;
            if (!applicationData.attendee) {
                applicationData.attendee = ko.observable();
            }
            applicationData.attendee({ firstName: '', lastName: '', email: '', phone: '', flag: false, flagString: false, note: '', AttendanceSheetId: '', imagePath: 'http://www.gravatar.com/avatar/?d=mm', isSelectedString: false });

            // popup title
            if (!applicationData.attendeeTitle) {
                applicationData.attendeeTitle = ko.observable();
            }
            applicationData.attendeeTitle('Creating a new Attendee ');

            // is modal showing
            if (!applicationData.isAttendeePopupShowing) {
                applicationData.isAttendeePopupShowing = ko.observable();
            }

            // ComboBox
            if (!applicationData.attendanceSheets) {
                applicationData.attendanceSheets = ko.observableArray();
            }
            applicationData.attendanceSheets(that.attendanceSheets());

            // DataGrid

            if (!applicationData.isAttendeePopupShowing() && applicationData.attendee() && applicationData.attendanceSheets().length >= 1) {
                pupUpAttendee.show().then(function (newAttendee) {
                    if (newAttendee) {
                        dataservice.createAttendee(newAttendee);
                        return Q(dataservice.SaveChanges()).then(function () { app.trigger('attendance:refreshDataAttendee'); });
                    }
                });
            };
        };

        function filter(filterValue) {
            if (!filterValue) return $scope.customers;
            var matches = [];
            filterValue = filterValue.toLowerCase();
            for (var i = 0; i < customers.length; i++) {
                var cust = customers[i];
                if (
                cust.FirstName.toLowerCase().indexOf(filterValue) > -1 ||
                cust.LastName.toLowerCase().indexOf(filterValue) > -1
                ) {
                    matches.push(cust);
                }
            }
            return matches;
        };
        function createWatches() {
            $scope.$watch("searchText", function (filterText) {
                filterCustomers(filterText);
            });
        }
        function filterCustomers(filterText) {
            $scope.filteredCustomers = filter(filterText);
            $scope.filteredCount = $scope.filteredCustomers.length;
        }
    }
})();