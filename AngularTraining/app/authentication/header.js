'use strict';

angular.module('app')
  .controller('HeaderCtrl', ['$scope', 'authDataservice', function ($scope, User) {
    $scope.user = User.getUserData();
  }]);
