'use strict';

angular.module('app')
  .controller('LogoutCtrl', ['$state', 'authDataservice', function ($state, User) {
      User.removeAuthentication();
    $state.go('login');
  }]);