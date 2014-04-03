
(function () {
    'use strict';
var controllerId = 'LoginCtrl';

angular.module('app').controller(controllerId, ['$scope', '$state', '$location', 'authDataservice', 'applicationData',  LoginCtrl]);
function LoginCtrl($scope, $state, $location, User, applicationData) {



    $scope.username = '';
    $scope.password = '';
    $scope.persist = false;
    $scope.errors = [];
    var nextState = null;

    try {
      nextState = User.getNextState();
    } catch (e) {
      nextState = null;
    }

    if(nextState !== null) {
      var nameBuffer = nextState.name + '';
      var errorBuffer = nextState.error + '';
      User.clearNextState();
      nextState = {
        name: nameBuffer,
        error: errorBuffer
      };
      if (typeof nextState.error === 'string' && nextState.error !== '' && $scope.errors.indexOf(nextState.error) === -1) {
        $scope.errors.push(nextState.error);
      } else {
        $scope.errors.push('You must be logged in to view this page');
      }
    }

    function disableLoginButton(message) {
      if (typeof message !== 'string') {
        message = 'Attempting login...';
      }
      jQuery('#login-form-submit-button').prop('disabled', true).prop('value', message);
    }

    function enableLoginButton(message) {
      if (typeof message !== 'string') {
        message = 'Submit';
      }
      jQuery('#login-form-submit-button').prop('disabled', false).prop('value', message);
    }

    function onSuccessfulLogin() {




        if (nextState !== null && typeof nextState.name === 'string' && nextState.name !== '') {
          //  debugger;
        $state.go(nextState.name, nextState.params);
        } else {
            $state.go('dashboard');
          // $location.path('customers');
        }
    }

    function onFailedLogin(error) {
      if (typeof error === 'string' && $scope.errors.indexOf(error) === -1) {
        $scope.errors.push(error);
      }
      enableLoginButton();
    }




    $scope.login = function () {
      disableLoginButton();
      User.authenticate($scope.username, $scope.password, onSuccessfulLogin, onFailedLogin, $scope.persist);
    };

}
})();