(function () {
    'use strict';
    angular.module('app').factory('utilities',
    [util]);
    function util() {
        extendString();
        var service = {
            emptyGuid: '00000000-0000-0000-0000-000000000000',
            newGuidComb: newGuidComb,
            getEntityByIdFromObj: getEntityByIdFromObj,
            getEntityManager: getEntityManager,
            getSaveErrorMessages: getSaveErrorMessages,
            getEntityValidationErrMsgs: getEntityValidationErrMsgs,
        };

        return service;


        /*********************************************************
        * Generate a new GuidCOMB Id (sequential for MS SQL Server)
        * @method newGuidComb {String}
        * @param [n] {Number} Optional integer value for a particular time value
        * if not supplied (and usually isn't), n = new Date.getTime()
        *********************************************************/
        function newGuidComb(n) {
            // Create a pseudo-Guid whose trailing 6 bytes (12 hex digits) are timebased
            // Start either with the given getTime() value, n, or get the current time in ms.
            // Each new Guid is greater than next if more than 1ms passes
            // See http://thatextramile.be/blog/2009/05/using-the-guidcomb-identifier-strategy
            // Based on breeze.core.getUuid which is based on this StackOverflow answer
            // http://stackoverflow.com/a/2117523/200253
            // Convert time value to hex: n.toString(16)
            // Make sure it is 6 bytes long: ('00'+ ...).slice(-12) ... from the rear
            // Replace LAST 6 bytes (12 hex digits) of regular Guid (that's where they sort in a Db)
            // Play with this in jsFiddle: http://jsfiddle.net/wardbell/qS8aN/
            var timePart = ('00' + (n || (new Date().getTime())).toString(16)).slice(-12);
            return 'xxxxxxxx-xxxx-4xxx-yxxx-'.replace(/[xy]/g, function (c) {
                var r = Math.random() * 16 | 0,
                v = c == 'x' ? r : (r & 0x3 | 0x8);
                return v.toString(16);
            }) + timePart;
        }


        /** Complex type helpers **/
        function getEntityByIdFromObj(obj, typeName, id) {
            var em = getEntityManager(obj);
            return (em) ? em.getEntityByKey(typeName, id) : null;
        }
        function getEntityManager(obj) {
            if (obj.complexAspect) {
                return obj.complexAspect.getEntityAspect().entityManager;
            } else if (obj.entityAspect) {
                return obj.entityAspect.entityManager;
            } else {
                return null;
            }
        }


        /*********************************************************
        * Handle save error messages
        *********************************************************/
        function getSaveErrorMessages(error) {
            var msg = error.message;
            var detail = error.detail;
            if (msg.match(/validation error/i)) {
                return getValidationMessages(error);
            } else if (detail && detail.ExceptionType &&
            detail.ExceptionType.indexOf('OptimisticConcurrencyException') !== -1) {
                // Concurrency error
                return "Another user, perhaps the server, " +
                "may have changed or deleted an entity in the change-set.";
            }
            return msg;
        }


        function getValidationMessages(error) {
            var detail = error.detail;
            if (detail) { // Failed validation on the server
                try {
                    return 'Server ' + detail.ExceptionMessage + '\nStackTrace: ' + detail.StackTrace;
                } catch (e) {
                    return 'Server ' + error.message;
                }
            }
            // Failed on client during pre-Save validation
            try {
                return error.entitiesWithErrors.map(function (entity) {
                    return entity.entityAspect.getValidationErrors().map(function (valError) {
                        return valError.errorMessage;
                    }).join(', \n');
                }).join('; \n');
            }
            catch (e) {
                return "validation error (error parsing exception :'" + e.message + "')";
            }
        }


        /*********************************************************
        * Return an entity's validation error messages as a string
        *********************************************************/
        function getEntityValidationErrMsgs(entity) {
            var errs = entity.entityAspect.getValidationErrors();
            return errs.length ?
            errs.map(function (err) { return err.errorMessage; }).join(", ") :
            "no errors";
        }


        /*******************************************************
        * String extensions
        * Monkey punching JavaScript native String class
        * w/ format, startsWith, endsWith
        * go ahead and shoot me but it's convenient
        ********************************************************/
        function extendString() {
            var stringFn = String.prototype;
            if (stringFn.format) { return; } // already extended
            // Ex: "{0} returned {1} item(s)".format(queryName, count));
            stringFn.format = stringFn.format || function () {
                var s = this;
                for (var i = 0, len = arguments.length; i < len; i++) {
                    var reg = new RegExp("\\{" + i + "\\}", "gm");
                    s = s.replace(reg, arguments[i]);
                }
                return s;
            };
            stringFn.endsWith = stringFn.endsWith || function (suffix) {
                return (this.substr(this.length - suffix.length) === suffix);
            };
            stringFn.startsWith = stringFn.startsWith || function (prefix) {
                return (this.substr(0, prefix.length) === prefix);
            };
            stringFn.contains = stringFn.contains || function (value) {
                return (this.indexOf(value) !== -1);
            };
        }



    }
})();