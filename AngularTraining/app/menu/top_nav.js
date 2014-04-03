
define(function (require) {
    var security = require('infrastructure/security'),
    accountdataservice = require('../account/accountDataService'),
    applicationData = require('infrastructure/applicationData'),
    pupUpUserProfile = require('../account/userProfilePopUp'),
    ko = require('knockout');

    var ctor = function () {
        this.userName = ko.observable();
        this.imagePath = ko.observable();
        this.userIsAdmin = ko.observable(false);
        this.userProfile = ko.observable();
    };

    ctor.prototype.activate = function () {
        var that = this;
        that.userName(security.user().UserName);
        ko.utils.arrayFirst(security.user().Roles, function (item) {
            if (item === 'Administrator') {
                that.userIsAdmin(true);
            }
        });
        that.getData();
    };

    ctor.prototype.logout = function () {
        security.logout();
    };

    ctor.prototype.getData = function () {
        var that = this;
        Q(accountdataservice.getUserProfileInfo({ 'userName': that.userName() })).then(function (result) {
            var data = result;
            that.userProfile(data);
            that.imagePath(data.imagePath);
        });
    };

    ctor.prototype.edit = function (id) {
        var that = this;
        // current entity
        if (!applicationData.userProfile) {
            applicationData.userProfile = ko.observable();
        }
        if (that.userProfile().DisplayName && that.userProfile().DisplayName!=null) {
          
        } else {
            that.userProfile().DisplayName = that.inverseCamel(that.userName());
        }

        

        applicationData.userProfile(that.userProfile());
    
        // popup title
        if (!applicationData.userProfileTitle) {
            applicationData.userProfileTitle = ko.observable();
        }
        applicationData.userProfileTitle('Editing User Profile ' + applicationData.userProfile().UserName);
        // is modal showing
        if (!applicationData.isUserProfilePopupShowing) {
            applicationData.isUserProfilePopupShowing = ko.observable();
        }
        if (!applicationData.isUserProfilePopupShowing() && applicationData.userProfile()) {
            pupUpUserProfile.show().then(function (modifiedUserProfile) {
                if (modifiedUserProfile) {
                    if (!modifiedUserProfile.imagePath) {
                        modifiedUserProfile.imagePath = 'http://www.gravatar.com/avatar/?d=mm';
                    };
                 
                    return Q(accountdataservice.saveUserProfileInfo(modifiedUserProfile())).then(function (result) {
                            that.getData();
                        toastr.success(result);
                    })
                    .fail(function (error) {
                        toastr.error(error);
                    });
                }
                return null;
            });
        };
    };

    ctor.prototype.inverseCamel = function (data) {
        return data
         .replace(/\s(.)/g, function ($1) { return $1.toLowerCase(); })
         .replace(/\s/g, '')
         .replace(/^(.)/, function ($1) { return $1.toUpperCase(); });
    };


    return ctor;
});
