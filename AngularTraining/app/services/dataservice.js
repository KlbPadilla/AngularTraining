(function () {
    'use strict';
    var serviceId = 'dataservice';
    angular.module('app').factory(serviceId, ['common', 'config', 'entityManagerFactory', 'uow', 'authDataservice', '$injector', 'zStorageWip', dataservice]);
    function dataservice(common, config, emFactory, uow, User, $injector, zStorageWip) {
        // get the Authenticated User information
        var user = User.getUserData();
        var antiForgeryToken = 'Bearer ' + user.bearerToken;
        var userSessionId = user.userSessionId;
        var getLogFn = common.logger.getLogFn;
        var log = getLogFn();
        var logError = getLogFn(serviceId, 'error');
        var logSuccess = getLogFn(serviceId, 'success');
        var events = config.events;
        var hasChangesChanged;
        var entitiesChanged;
        var entityQuery = breeze.EntityQuery;
        var entityManager = emFactory.newManager();
        var saveChanges = function () {
            return entityManager.saveChanges()
            .then(saveSucceeded)
            .fail(saveFailed)
            .done(checkStates);
            function saveSucceeded(saveResult) {
                backupLocally();
                log('Saved data successfully', saveResult, true);
            }
            function saveFailed(error) {
                var reason = error.message;
                var detail = error.detail;
                if (error.entityErrors) {
                    reason = handleSaveValidationError(error);
                } else if (detail && detail.ExceptionType &&
                detail.ExceptionType.indexOf('OptimisticConcurrencyException') !== -1) {
                    // Concurrency error
                    reason =
                    "Another user, perhaps the server, " +
                    "may have deleted one or all of the Data." +
                    " You may have to restart the app.";
                } else {
                    reason = "Failed to save changes: " + reason +
                    " You may have to restart the app.";
                }
                logError(error, reason);
            }
            function handleSaveValidationError(error) {
                var message = "Not saved due to validation error";
                try { // fish out the first error
                    var firstErr = error.entityErrors[0];
                    message = firstErr.errorMessage;
                } catch (e) { /* eat it for now */ }
                return message;
            }
            function checkStates() {
            }
        };
        var service = {
            SaveChanges: function () {
                return saveChanges();
            },
            hasChangesChanged: function () {
                return hasChangesChanged();
            },
            entitiesChanged: function () {
                return entitiesChanged();
            },
            zStorageWip: zStorageWip,
            cancelChanges: function () {
                return entityManager.rejectChanges();
            },
            // Repositories to be added on demand, ohh yeah
            getRepo: function (repo) {
                return $injector.get(repo);
            },
        };

        init();

        function loadPrimeData() {
            if (user.isAuthenticated) {
                var repo = service.getRepo('repository.prime');
                repo.getPrimeData();
            }
        }
        return service;

        function init() {
            amplify.store(userSessionId, null);
            uow.init(entityManager, entityQuery);
            entityManager.fetchMetadata();
            // Here's how we get the AJAX adapter and set the header required for the Web API anti-CSRF mechanism:
            var ajaxAdapter = breeze.config.getAdapterInstance("ajax");
            ajaxAdapter.defaultSettings = {
                headers: {
                    'Authorization': antiForgeryToken,
                    "X-UserSessionId": userSessionId
                },
            };
            zStorageWip.init(entityManager);
            setupEventForHasChangesChanged();
            setupEventForEntitiesChanged();
            loadPrimeData();

        }
        function setupEventForHasChangesChanged() {
            entityManager.hasChangesChanged.subscribe(function (eventArgs) {
                var data = { hasChanges: eventArgs.hasChanges };
                common.$broadcast('dataservice.hasChangesChanged', data);
                hasChangesChanged = eventArgs.hasChanges;
            });
        }
        function setupEventForEntitiesChanged() {
            // We use this for detecting changes of any kind so we can save them to local storage
            entityManager.entityChanged.subscribe(function (changeArgs) {
                if (changeArgs.entityAction === breeze.EntityAction.PropertyChange) {
                    common.$broadcast('dataservice.entitiesChanged', changeArgs);
                    entitiesChanged = changeArgs;
                }
            });
        }
        function backupLocally() {
            // exports only changes
            var changes = entityManager.getChanges();
            // var changesExport = manager.exportEntities(changes);
            // return amplify.store(userSessionId, changesExport);
            // exports everything
            var alldata = entityManager.exportEntities();
            return amplify.store(userSessionId, alldata);
        }
    }
})();
