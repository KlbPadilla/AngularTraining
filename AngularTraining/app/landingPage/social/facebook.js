﻿
(function () {
    'use strict';
    var controllerId = 'facebookCtrl';
    angular.module('app').controller(controllerId, ['$scope', '$timeout', 'Facebook', facebookCtrl]);
    function facebookCtrl($scope, $timeout, Facebook) {
        $scope.user = {};
        $scope.logged = false;
        $scope.byebye = false;
        $scope.salutation = false;
        /**
        * Watch for Facebook to be ready.
        * There's also the event that could be used
        */
        $scope.$watch(
        function () {
            return Facebook.isReady();
        },
        function (newVal) {
            if (newVal)
                $scope.facebookReady = true;
        }
        );

        /**
        * IntentLogin
        */
        $scope.IntentLogin = function () {
            Facebook.getLoginStatus(function (response) {
                if (response.status == 'connected') {
                    $scope.logged = true;
                    $scope.me();
                }
                else
                    $scope.login();
            });
        };

        /**
        * Login
        */
        $scope.login = function () {
            Facebook.login(function (response) {
                if (response.status == 'connected') {
                    $scope.logged = true;
                    $scope.me();
                }
            });
        };

        /**
        * me
        */
        $scope.me = function () {
            Facebook.api('/me', function (response) {
                /**
                * Using $scope.$apply since this happens outside angular framework.
                */
                $scope.$apply(function () {
                    $scope.user = response;
                });
            });
        };

        /**
        * Logout
        */
        $scope.logout = function () {
            Facebook.logout(function () {
                $scope.$apply(function () {
                    $scope.user = {};
                    $scope.logged = false;
                });
            });
        };

        /**
        * Taking approach of Events :D
        */
        $scope.$on('Facebook:statusChange', function (ev, data) {
            console.log('Status: ', data);
            if (data.status == 'connected') {
                $scope.$apply(function () {
                    $scope.salutation = true;
                    $scope.byebye = false;
                });
            } else {
                $scope.$apply(function () {
                    $scope.salutation = false;
                    $scope.byebye = true;
                    // Dismiss byebye message after two seconds
                    $timeout(function () {
                        $scope.byebye = false;
                    }, 2000);
                });
            }
        });

        $scope.getLoginStatus = function () {
            Facebook.getLoginStatus(function (response) {
                if (response.status == 'connected') {
                    $scope.$apply(function () {
                        $scope.loggedIn = true;
                    });
                }
                else {
                    $scope.$apply(function () {
                        $scope.loggedIn = false;
                    });
                }
            });
        };
    }
})();
