(function () {
    'use strict';

    var serviceId = 'model';

    angular.module('app').factory(serviceId, model);

    var nulloDate = new Date(1900, 0, 1);

    function model() {
        var service = {
            configureMetadataStore: configureMetadataStore
        };

        return service;

        function configureMetadataStore(metadataStore) {

            registerAddress(metadataStore);

            registerAddressType(metadataStore);

            registerAppUser(metadataStore);

            registerCustomer(metadataStore);

            registerEmail(metadataStore);

            registerEmailType(metadataStore);

            registerEmployee(metadataStore);

            registerEmployeeTimeClock(metadataStore);

            registerInvoiceDetail(metadataStore);

            registerInvoice(metadataStore);

            registerInvoiceType(metadataStore);

            registerMessage(metadataStore);

            registerPhoneCall(metadataStore);

            registerPhoneCallType(metadataStore);

            registerPhone(metadataStore);

            registerPhoneType(metadataStore);

            registerProductCategory(metadataStore);

            registerProduct(metadataStore);

        }


        function registerAddress(metadataStore) {
            metadataStore.registerEntityTypeCtor('Address' , Address);
            service.Address = Address;

            function Address() { /* empty ctor */ }

            Object.defineProperty(Address.prototype , 'IsMainString' , {
                get: function() {
                    if (this.IsMain) {
                        return "true";
                    } else {
                        return "false";
                    }
                } ,
                set: function(value) {
                    if (value == "true") {
                        this.IsMain = true;
                    } else {
                        this.IsMain = false;
                    }
                }
            }) , Object.defineProperty(Address.prototype , 'profileState' , {
                get: function() {
                    var a0 = this.Address1;
                    var a1 = this.Address2;
                    var a2 = this.State;
                    var a3 = this.Notes;
                    var a4 = this.Zip;
                    var a5 = this.Country;
                    var a6 = this.Id;
                    if (!a0 || !a1 || !a2 || !a3 || !a4 || !a5 || !a6) {
                        return 'btn btn-danger btn-xs ';
                    } else {
                        return 'btn btn-success btn-xs ';
                    }
                } ,
                set: function(value) {}
            }) , Object.defineProperty(Address.prototype , 'profileStateIcon' , {
                get: function() {
                    var a0 = this.Address1;
                    var a1 = this.Address2;
                    var a2 = this.State;
                    var a3 = this.Notes;
                    var a4 = this.Zip;
                    var a5 = this.Country;
                    var a6 = this.Id;
                    if (!a0 || !a1 || !a2 || !a3 || !a4 || !a5 || !a6) {
                        return 'fa fa-asterisk fa-fw';
                    } else {
                        return 'fa fa-check fa-fw';
                    }
                } ,
                set: function(value) {}
            });
        }

        function registerAddressType(metadataStore) {
            metadataStore.registerEntityTypeCtor('AddressType' , AddressType);
            service.AddressType = AddressType;

            function AddressType() { /* empty ctor */ }

            Object.defineProperty(AddressType.prototype , 'profileState' , {
                get: function() {
                    var a0 = this.Type;
                    if (!a0) {
                        return 'btn btn-danger btn-xs ';
                    } else {
                        return 'btn btn-success btn-xs ';
                    }
                } ,
                set: function(value) {}
            }) , Object.defineProperty(AddressType.prototype , 'profileStateIcon' , {
                get: function() {
                    var a0 = this.Type;
                    if (!a0) {
                        return 'fa fa-asterisk fa-fw';
                    } else {
                        return 'fa fa-check fa-fw';
                    }
                } ,
                set: function(value) {}
            });
        }

        function registerAppUser(metadataStore) {
            metadataStore.registerEntityTypeCtor('AppUser' , AppUser);
            service.AppUser = AppUser;

            function AppUser() { /* empty ctor */ }

            Object.defineProperty(AppUser.prototype , 'profileState' , {
                get: function() {
                    var a0 = this.Name;
                    var a1 = this.SecurityLevel;
                    if (!a0 || !a1) {
                        return 'btn btn-danger btn-xs ';
                    } else {
                        return 'btn btn-success btn-xs ';
                    }
                } ,
                set: function(value) {}
            }) , Object.defineProperty(AppUser.prototype , 'profileStateIcon' , {
                get: function() {
                    var a0 = this.Name;
                    var a1 = this.SecurityLevel;
                    if (!a0 || !a1) {
                        return 'fa fa-asterisk fa-fw';
                    } else {
                        return 'fa fa-check fa-fw';
                    }
                } ,
                set: function(value) {}
            });
        }

        function registerCustomer(metadataStore) {
            metadataStore.registerEntityTypeCtor('Customer' , Customer);
            service.Customer = Customer;

            function Customer() { /* empty ctor */ }

            Object.defineProperty(Customer.prototype , 'IsCompanyString' , {
                get: function() {
                    if (this.IsCompany) {
                        return "true";
                    } else {
                        return "false";
                    }
                } ,
                set: function(value) {
                    if (value == "true") {
                        this.IsCompany = true;
                    } else {
                        this.IsCompany = false;
                    }
                }
            }) , Object.defineProperty(Customer.prototype , 'DateOfBirth2' , {
                get: function() {
                    var date1 = this.DateOfBirth;
                    var value;
                    if ((date1 - nulloDate) === 0) {
                        value = ' [Select a Date Of Birth ]';
                    } else {
                        if (date1 && moment.utc(date1).isValid) value = moment.utc(date1).format('dddd, MMMM DD [,] YYYY');
                        else {
                            value = '[Unknown]';
                        }
                    }
                    return value;
                } ,
                set: function(value) { this.DateOfBirth = value; }
            }) , Object.defineProperty(Customer.prototype , 'IsActiveString' , {
                get: function() {
                    if (this.IsActive) {
                        return "true";
                    } else {
                        return "false";
                    }
                } ,
                set: function(value) {
                    if (value == "true") {
                        this.IsActive = true;
                    } else {
                        this.IsActive = false;
                    }
                }
            }) , Object.defineProperty(Customer.prototype , 'FullName' , {
                get: function() {
                    var fn = this.LastName;
                    var ln = this.FirstName;
                    return ln ? fn + ' ' + ln : fn;
                } ,
                set: function() {}
            }) , Object.defineProperty(Customer.prototype , 'profileState' , {
                get: function() {
                    var a0 = this.FirstName;
                    var a1 = this.LastName;
                    var a2 = this.DateOfBirth;
                    var a3 = this.SexGender;
                    var a4 = this.MaritalStatus;
                    var a5 = this.imagePath;
                    var a6 = this.Notes;
                    if (!a0 || !a1 || !a2 || !a3 || !a4 || !a5 || !a6) {
                        return 'btn btn-danger btn-xs ';
                    } else {
                        return 'btn btn-success btn-xs ';
                    }
                } ,
                set: function(value) {}
            }) , Object.defineProperty(Customer.prototype , 'profileStateIcon' , {
                get: function() {
                    var a0 = this.FirstName;
                    var a1 = this.LastName;
                    var a2 = this.DateOfBirth;
                    var a3 = this.SexGender;
                    var a4 = this.MaritalStatus;
                    var a5 = this.imagePath;
                    var a6 = this.Notes;
                    if (!a0 || !a1 || !a2 || !a3 || !a4 || !a5 || !a6) {
                        return 'fa fa-asterisk fa-fw';
                    } else {
                        return 'fa fa-check fa-fw';
                    }
                } ,
                set: function(value) {}
            });
        }

        function registerEmail(metadataStore) {
            metadataStore.registerEntityTypeCtor('Email' , Email);
            service.Email = Email;

            function Email() { /* empty ctor */ }

            Object.defineProperty(Email.prototype , 'IsMainString' , {
                get: function() {
                    if (this.IsMain) {
                        return "true";
                    } else {
                        return "false";
                    }
                } ,
                set: function(value) {
                    if (value == "true") {
                        this.IsMain = true;
                    } else {
                        this.IsMain = false;
                    }
                }
            }) , Object.defineProperty(Email.prototype , 'profileState' , {
                get: function() {
                    var a0 = this.EmailLeft;
                    var a1 = this.EmailDomain;
                    var a2 = this.Id;
                    if (!a0 || !a1 || !a2) {
                        return 'btn btn-danger btn-xs ';
                    } else {
                        return 'btn btn-success btn-xs ';
                    }
                } ,
                set: function(value) {}
            }) , Object.defineProperty(Email.prototype , 'profileStateIcon' , {
                get: function() {
                    var a0 = this.EmailLeft;
                    var a1 = this.EmailDomain;
                    var a2 = this.Id;
                    if (!a0 || !a1 || !a2) {
                        return 'fa fa-asterisk fa-fw';
                    } else {
                        return 'fa fa-check fa-fw';
                    }
                } ,
                set: function(value) {}
            });
        }

        function registerEmailType(metadataStore) {
            metadataStore.registerEntityTypeCtor('EmailType' , EmailType);
            service.EmailType = EmailType;

            function EmailType() { /* empty ctor */ }

            Object.defineProperty(EmailType.prototype , 'profileState' , {
                get: function() {
                    var a0 = this.Type;
                    if (!a0) {
                        return 'btn btn-danger btn-xs ';
                    } else {
                        return 'btn btn-success btn-xs ';
                    }
                } ,
                set: function(value) {}
            }) , Object.defineProperty(EmailType.prototype , 'profileStateIcon' , {
                get: function() {
                    var a0 = this.Type;
                    if (!a0) {
                        return 'fa fa-asterisk fa-fw';
                    } else {
                        return 'fa fa-check fa-fw';
                    }
                } ,
                set: function(value) {}
            });
        }

        function registerEmployee(metadataStore) {
            metadataStore.registerEntityTypeCtor('Employee' , Employee);
            service.Employee = Employee;

            function Employee() { /* empty ctor */ }

            Object.defineProperty(Employee.prototype , 'DateOfBirth2' , {
                get: function() {
                    var date1 = this.DateOfBirth;
                    var value;
                    if ((date1 - nulloDate) === 0) {
                        value = ' [Select a Date Of Birth ]';
                    } else {
                        if (date1 && moment.utc(date1).isValid) value = moment.utc(date1).format('dddd, MMMM DD [,] YYYY');
                        else {
                            value = '[Unknown]';
                        }
                    }
                    return value;
                } ,
                set: function(value) { this.DateOfBirth = value; }
            }) , Object.defineProperty(Employee.prototype , 'FullName' , {
                get: function() {
                    var fn = this.LastName;
                    var ln = this.FirstName;
                    return ln ? fn + ' ' + ln : fn;
                } ,
                set: function() {}
            }) , Object.defineProperty(Employee.prototype , 'profileState' , {
                get: function() {
                    var a0 = this.FirstName;
                    var a1 = this.LastName;
                    var a2 = this.DateOfBirth;
                    var a3 = this.Salary;
                    var a4 = this.Photo;
                    var a5 = this.PositionHeld;
                    if (!a0 || !a1 || !a2 || !a3 || !a4 || !a5) {
                        return 'btn btn-danger btn-xs ';
                    } else {
                        return 'btn btn-success btn-xs ';
                    }
                } ,
                set: function(value) {}
            }) , Object.defineProperty(Employee.prototype , 'profileStateIcon' , {
                get: function() {
                    var a0 = this.FirstName;
                    var a1 = this.LastName;
                    var a2 = this.DateOfBirth;
                    var a3 = this.Salary;
                    var a4 = this.Photo;
                    var a5 = this.PositionHeld;
                    if (!a0 || !a1 || !a2 || !a3 || !a4 || !a5) {
                        return 'fa fa-asterisk fa-fw';
                    } else {
                        return 'fa fa-check fa-fw';
                    }
                } ,
                set: function(value) {}
            });
        }

        function registerEmployeeTimeClock(metadataStore) {
            metadataStore.registerEntityTypeCtor('EmployeeTimeClock' , EmployeeTimeClock);
            service.EmployeeTimeClock = EmployeeTimeClock;

            function EmployeeTimeClock() { /* empty ctor */ }

            Object.defineProperty(EmployeeTimeClock.prototype , 'ClockingInString' , {
                get: function() {
                    if (this.ClockingIn) {
                        return "true";
                    } else {
                        return "false";
                    }
                } ,
                set: function(value) {
                    if (value == "true") {
                        this.ClockingIn = true;
                    } else {
                        this.ClockingIn = false;
                    }
                }
            }) , Object.defineProperty(EmployeeTimeClock.prototype , 'ClockDateTime2' , {
                get: function() {
                    var date1 = this.ClockDateTime;
                    var value;
                    if ((date1 - nulloDate) === 0) {
                        value = ' [Select a Clock Date Time ]';
                    } else {
                        if (date1 && moment.utc(date1).isValid) value = moment.utc(date1).format('dddd, MMMM DD [,] YYYY');
                        else {
                            value = '[Unknown]';
                        }
                    }
                    return value;
                } ,
                set: function(value) { this.ClockDateTime = value; }
            }) , Object.defineProperty(EmployeeTimeClock.prototype , 'LastModifiedTime2' , {
                get: function() {
                    var date1 = this.LastModifiedTime;
                    var value;
                    if ((date1 - nulloDate) === 0) {
                        value = ' [Select a Last Modified Time ]';
                    } else {
                        if (date1 && moment.utc(date1).isValid) value = moment.utc(date1).format('dddd, MMMM DD [,] YYYY');
                        else {
                            value = '[Unknown]';
                        }
                    }
                    return value;
                } ,
                set: function(value) { this.LastModifiedTime = value; }
            }) , Object.defineProperty(EmployeeTimeClock.prototype , 'IsSystemEntryString' , {
                get: function() {
                    if (this.IsSystemEntry) {
                        return "true";
                    } else {
                        return "false";
                    }
                } ,
                set: function(value) {
                    if (value == "true") {
                        this.IsSystemEntry = true;
                    } else {
                        this.IsSystemEntry = false;
                    }
                }
            }) , Object.defineProperty(EmployeeTimeClock.prototype , 'profileState' , {
                get: function() {
                    var a0 = this.EmployeeID;
                    var a1 = this.ClockDateTime;
                    var a2 = this.State;
                    var a3 = this.LastModifiedBy;
                    var a4 = this.LastModifiedTime;
                    var a5 = this.TerminalNumber;
                    var a6 = this.FacilityID;
                    var a7 = this.CostCenterID;
                    var a8 = this.CostCenterAccountID;
                    if (!a0 || !a1 || !a2 || !a3 || !a4 || !a5 || !a6 || !a7 || !a8) {
                        return 'btn btn-danger btn-xs ';
                    } else {
                        return 'btn btn-success btn-xs ';
                    }
                } ,
                set: function(value) {}
            }) , Object.defineProperty(EmployeeTimeClock.prototype , 'profileStateIcon' , {
                get: function() {
                    var a0 = this.EmployeeID;
                    var a1 = this.ClockDateTime;
                    var a2 = this.State;
                    var a3 = this.LastModifiedBy;
                    var a4 = this.LastModifiedTime;
                    var a5 = this.TerminalNumber;
                    var a6 = this.FacilityID;
                    var a7 = this.CostCenterID;
                    var a8 = this.CostCenterAccountID;
                    if (!a0 || !a1 || !a2 || !a3 || !a4 || !a5 || !a6 || !a7 || !a8) {
                        return 'fa fa-asterisk fa-fw';
                    } else {
                        return 'fa fa-check fa-fw';
                    }
                } ,
                set: function(value) {}
            });
        }

        function registerInvoiceDetail(metadataStore) {
            metadataStore.registerEntityTypeCtor('InvoiceDetail' , InvoiceDetail);
            service.InvoiceDetail = InvoiceDetail;

            function InvoiceDetail() { /* empty ctor */ }

            Object.defineProperty(InvoiceDetail.prototype , 'profileState' , {
                get: function() {
                    var a0 = this.Qty;
                    var a1 = this.PriceWithDiscount;
                    var a2 = this.LineTax;
                    var a3 = this.LineCommission;
                    var a4 = this.LineTotal;
                    if (!a0 || !a1 || !a2 || !a3 || !a4) {
                        return 'btn btn-danger btn-xs ';
                    } else {
                        return 'btn btn-success btn-xs ';
                    }
                } ,
                set: function(value) {}
            }) , Object.defineProperty(InvoiceDetail.prototype , 'profileStateIcon' , {
                get: function() {
                    var a0 = this.Qty;
                    var a1 = this.PriceWithDiscount;
                    var a2 = this.LineTax;
                    var a3 = this.LineCommission;
                    var a4 = this.LineTotal;
                    if (!a0 || !a1 || !a2 || !a3 || !a4) {
                        return 'fa fa-asterisk fa-fw';
                    } else {
                        return 'fa fa-check fa-fw';
                    }
                } ,
                set: function(value) {}
            });
        }

        function registerInvoice(metadataStore) {
            metadataStore.registerEntityTypeCtor('Invoice' , Invoice);
            service.Invoice = Invoice;

            function Invoice() { /* empty ctor */ }

            Object.defineProperty(Invoice.prototype , 'DateOfSale2' , {
                get: function() {
                    var date1 = this.DateOfSale;
                    var value;
                    if ((date1 - nulloDate) === 0) {
                        value = ' [Select a Date Of Sale ]';
                    } else {
                        if (date1 && moment.utc(date1).isValid) value = moment.utc(date1).format('dddd, MMMM DD [,] YYYY');
                        else {
                            value = '[Unknown]';
                        }
                    }
                    return value;
                } ,
                set: function(value) { this.DateOfSale = value; }
            }) , Object.defineProperty(Invoice.prototype , 'DueDate2' , {
                get: function() {
                    var date1 = this.DueDate;
                    var value;
                    if ((date1 - nulloDate) === 0) {
                        value = ' [Select a Due Date ]';
                    } else {
                        if (date1 && moment.utc(date1).isValid) value = moment.utc(date1).format('dddd, MMMM DD [,] YYYY');
                        else {
                            value = '[Unknown]';
                        }
                    }
                    return value;
                } ,
                set: function(value) { this.DueDate = value; }
            }) , Object.defineProperty(Invoice.prototype , 'ShipDate2' , {
                get: function() {
                    var date1 = this.ShipDate;
                    var value;
                    if ((date1 - nulloDate) === 0) {
                        value = ' [Select a Ship Date ]';
                    } else {
                        if (date1 && moment.utc(date1).isValid) value = moment.utc(date1).format('dddd, MMMM DD [,] YYYY');
                        else {
                            value = '[Unknown]';
                        }
                    }
                    return value;
                } ,
                set: function(value) { this.ShipDate = value; }
            }) , Object.defineProperty(Invoice.prototype , 'ModifiedDate2' , {
                get: function() {
                    var date1 = this.ModifiedDate;
                    var value;
                    if ((date1 - nulloDate) === 0) {
                        value = ' [Select a Modified Date ]';
                    } else {
                        if (date1 && moment.utc(date1).isValid) value = moment.utc(date1).format('dddd, MMMM DD [,] YYYY');
                        else {
                            value = '[Unknown]';
                        }
                    }
                    return value;
                } ,
                set: function(value) { this.ModifiedDate = value; }
            }) , Object.defineProperty(Invoice.prototype , 'profileState' , {
                get: function() {
                    var a0 = this.DateOfSale;
                    var a1 = this.DueDate;
                    var a2 = this.ShipDate;
                    var a3 = this.PrintDocNumber;
                    var a4 = this.ShipMethod;
                    var a5 = this.SubTotal;
                    var a6 = this.TaxAmt;
                    var a7 = this.Freight;
                    var a8 = this.TotalDue;
                    var a9 = this.Comment;
                    var a10 = this.ModifiedDate;
                    var a11 = this.Image;
                    if (!a0 || !a1 || !a2 || !a3 || !a4 || !a5 || !a6 || !a7 || !a8 || !a9 || !a10 || !a11) {
                        return 'btn btn-danger btn-xs ';
                    } else {
                        return 'btn btn-success btn-xs ';
                    }
                } ,
                set: function(value) {}
            }) , Object.defineProperty(Invoice.prototype , 'profileStateIcon' , {
                get: function() {
                    var a0 = this.DateOfSale;
                    var a1 = this.DueDate;
                    var a2 = this.ShipDate;
                    var a3 = this.PrintDocNumber;
                    var a4 = this.ShipMethod;
                    var a5 = this.SubTotal;
                    var a6 = this.TaxAmt;
                    var a7 = this.Freight;
                    var a8 = this.TotalDue;
                    var a9 = this.Comment;
                    var a10 = this.ModifiedDate;
                    var a11 = this.Image;
                    if (!a0 || !a1 || !a2 || !a3 || !a4 || !a5 || !a6 || !a7 || !a8 || !a9 || !a10 || !a11) {
                        return 'fa fa-asterisk fa-fw';
                    } else {
                        return 'fa fa-check fa-fw';
                    }
                } ,
                set: function(value) {}
            });
        }

        function registerInvoiceType(metadataStore) {
            metadataStore.registerEntityTypeCtor('InvoiceType' , InvoiceType);
            service.InvoiceType = InvoiceType;

            function InvoiceType() { /* empty ctor */ }

            Object.defineProperty(InvoiceType.prototype , 'profileState' , {
                get: function() {
                    var a0 = this.Type;
                    if (!a0) {
                        return 'btn btn-danger btn-xs ';
                    } else {
                        return 'btn btn-success btn-xs ';
                    }
                } ,
                set: function(value) {}
            }) , Object.defineProperty(InvoiceType.prototype , 'profileStateIcon' , {
                get: function() {
                    var a0 = this.Type;
                    if (!a0) {
                        return 'fa fa-asterisk fa-fw';
                    } else {
                        return 'fa fa-check fa-fw';
                    }
                } ,
                set: function(value) {}
            });
        }

        function registerMessage(metadataStore) {
            metadataStore.registerEntityTypeCtor('Message' , Message);
            service.Message = Message;

            function Message() { /* empty ctor */ }

            Object.defineProperty(Message.prototype , 'DateOfPost2' , {
                get: function() {
                    var date1 = this.DateOfPost;
                    var value;
                    if ((date1 - nulloDate) === 0) {
                        value = ' [Select a Date Of Post ]';
                    } else {
                        if (date1 && moment.utc(date1).isValid) value = moment.utc(date1).format('dddd, MMMM DD [,] YYYY');
                        else {
                            value = '[Unknown]';
                        }
                    }
                    return value;
                } ,
                set: function(value) { this.DateOfPost = value; }
            }) , Object.defineProperty(Message.prototype , 'CanDeleteString' , {
                get: function() {
                    if (this.CanDelete) {
                        return "true";
                    } else {
                        return "false";
                    }
                } ,
                set: function(value) {
                    if (value == "true") {
                        this.CanDelete = true;
                    } else {
                        this.CanDelete = false;
                    }
                }
            }) , Object.defineProperty(Message.prototype , 'profileState' , {
                get: function() {
                    var a0 = this.DateOfPost;
                    var a1 = this.MessageText;
                    var a2 = this.Id;
                    if (!a0 || !a1 || !a2) {
                        return 'btn btn-danger btn-xs ';
                    } else {
                        return 'btn btn-success btn-xs ';
                    }
                } ,
                set: function(value) {}
            }) , Object.defineProperty(Message.prototype , 'profileStateIcon' , {
                get: function() {
                    var a0 = this.DateOfPost;
                    var a1 = this.MessageText;
                    var a2 = this.Id;
                    if (!a0 || !a1 || !a2) {
                        return 'fa fa-asterisk fa-fw';
                    } else {
                        return 'fa fa-check fa-fw';
                    }
                } ,
                set: function(value) {}
            });
        }

        function registerPhoneCall(metadataStore) {
            metadataStore.registerEntityTypeCtor('PhoneCall' , PhoneCall);
            service.PhoneCall = PhoneCall;

            function PhoneCall() { /* empty ctor */ }

            Object.defineProperty(PhoneCall.prototype , 'DateOfCall2' , {
                get: function() {
                    var date1 = this.DateOfCall;
                    var value;
                    if ((date1 - nulloDate) === 0) {
                        value = ' [Select a Date Of Call ]';
                    } else {
                        if (date1 && moment.utc(date1).isValid) value = moment.utc(date1).format('dddd, MMMM DD [,] YYYY');
                        else {
                            value = '[Unknown]';
                        }
                    }
                    return value;
                } ,
                set: function(value) { this.DateOfCall = value; }
            }) , Object.defineProperty(PhoneCall.prototype , 'profileState' , {
                get: function() {
                    var a0 = this.DateOfCall;
                    var a1 = this.Notes;
                    var a2 = this.Id;
                    if (!a0 || !a1 || !a2) {
                        return 'btn btn-danger btn-xs ';
                    } else {
                        return 'btn btn-success btn-xs ';
                    }
                } ,
                set: function(value) {}
            }) , Object.defineProperty(PhoneCall.prototype , 'profileStateIcon' , {
                get: function() {
                    var a0 = this.DateOfCall;
                    var a1 = this.Notes;
                    var a2 = this.Id;
                    if (!a0 || !a1 || !a2) {
                        return 'fa fa-asterisk fa-fw';
                    } else {
                        return 'fa fa-check fa-fw';
                    }
                } ,
                set: function(value) {}
            });
        }

        function registerPhoneCallType(metadataStore) {
            metadataStore.registerEntityTypeCtor('PhoneCallType' , PhoneCallType);
            service.PhoneCallType = PhoneCallType;

            function PhoneCallType() { /* empty ctor */ }

            Object.defineProperty(PhoneCallType.prototype , 'profileState' , {
                get: function() {
                    var a0 = this.Type;
                    if (!a0) {
                        return 'btn btn-danger btn-xs ';
                    } else {
                        return 'btn btn-success btn-xs ';
                    }
                } ,
                set: function(value) {}
            }) , Object.defineProperty(PhoneCallType.prototype , 'profileStateIcon' , {
                get: function() {
                    var a0 = this.Type;
                    if (!a0) {
                        return 'fa fa-asterisk fa-fw';
                    } else {
                        return 'fa fa-check fa-fw';
                    }
                } ,
                set: function(value) {}
            });
        }

        function registerPhone(metadataStore) {
            metadataStore.registerEntityTypeCtor('Phone' , Phone);
            service.Phone = Phone;

            function Phone() { /* empty ctor */ }

            Object.defineProperty(Phone.prototype , 'IsMainString' , {
                get: function() {
                    if (this.IsMain) {
                        return "true";
                    } else {
                        return "false";
                    }
                } ,
                set: function(value) {
                    if (value == "true") {
                        this.IsMain = true;
                    } else {
                        this.IsMain = false;
                    }
                }
            }) , Object.defineProperty(Phone.prototype , 'IsCellPhoneString' , {
                get: function() {
                    if (this.IsCellPhone) {
                        return "true";
                    } else {
                        return "false";
                    }
                } ,
                set: function(value) {
                    if (value == "true") {
                        this.IsCellPhone = true;
                    } else {
                        this.IsCellPhone = false;
                    }
                }
            }) , Object.defineProperty(Phone.prototype , 'profileState' , {
                get: function() {
                    var a0 = this.Label;
                    var a1 = this.Number;
                    var a2 = this.Id;
                    if (!a0 || !a1 || !a2) {
                        return 'btn btn-danger btn-xs ';
                    } else {
                        return 'btn btn-success btn-xs ';
                    }
                } ,
                set: function(value) {}
            }) , Object.defineProperty(Phone.prototype , 'profileStateIcon' , {
                get: function() {
                    var a0 = this.Label;
                    var a1 = this.Number;
                    var a2 = this.Id;
                    if (!a0 || !a1 || !a2) {
                        return 'fa fa-asterisk fa-fw';
                    } else {
                        return 'fa fa-check fa-fw';
                    }
                } ,
                set: function(value) {}
            });
        }

        function registerPhoneType(metadataStore) {
            metadataStore.registerEntityTypeCtor('PhoneType' , PhoneType);
            service.PhoneType = PhoneType;

            function PhoneType() { /* empty ctor */ }

            Object.defineProperty(PhoneType.prototype , 'profileState' , {
                get: function() {
                    var a0 = this.Type;
                    if (!a0) {
                        return 'btn btn-danger btn-xs ';
                    } else {
                        return 'btn btn-success btn-xs ';
                    }
                } ,
                set: function(value) {}
            }) , Object.defineProperty(PhoneType.prototype , 'profileStateIcon' , {
                get: function() {
                    var a0 = this.Type;
                    if (!a0) {
                        return 'fa fa-asterisk fa-fw';
                    } else {
                        return 'fa fa-check fa-fw';
                    }
                } ,
                set: function(value) {}
            });
        }

        function registerProductCategory(metadataStore) {
            metadataStore.registerEntityTypeCtor('ProductCategory' , ProductCategory);
            service.ProductCategory = ProductCategory;

            function ProductCategory() { /* empty ctor */ }

            Object.defineProperty(ProductCategory.prototype , 'profileState' , {
                get: function() {
                    var a0 = this.Category;
                    if (!a0) {
                        return 'btn btn-danger btn-xs ';
                    } else {
                        return 'btn btn-success btn-xs ';
                    }
                } ,
                set: function(value) {}
            }) , Object.defineProperty(ProductCategory.prototype , 'profileStateIcon' , {
                get: function() {
                    var a0 = this.Category;
                    if (!a0) {
                        return 'fa fa-asterisk fa-fw';
                    } else {
                        return 'fa fa-check fa-fw';
                    }
                } ,
                set: function(value) {}
            });
        }

        function registerProduct(metadataStore) {
            metadataStore.registerEntityTypeCtor('Product' , Product);
            service.Product = Product;

            function Product() { /* empty ctor */ }

            Object.defineProperty(Product.prototype , 'LastDateOfSale2' , {
                get: function() {
                    var date1 = this.LastDateOfSale;
                    var value;
                    if ((date1 - nulloDate) === 0) {
                        value = ' [Select a Last Date Of Sale ]';
                    } else {
                        if (date1 && moment.utc(date1).isValid) value = moment.utc(date1).format('dddd, MMMM DD [,] YYYY');
                        else {
                            value = '[Unknown]';
                        }
                    }
                    return value;
                } ,
                set: function(value) { this.LastDateOfSale = value; }
            }) , Object.defineProperty(Product.prototype , 'CanBeSoldString' , {
                get: function() {
                    if (this.CanBeSold) {
                        return "true";
                    } else {
                        return "false";
                    }
                } ,
                set: function(value) {
                    if (value == "true") {
                        this.CanBeSold = true;
                    } else {
                        this.CanBeSold = false;
                    }
                }
            }) , Object.defineProperty(Product.prototype , 'profileState' , {
                get: function() {
                    var a0 = this.Title;
                    var a1 = this.Description;
                    var a2 = this.LastDateOfSale;
                    var a3 = this.Sku;
                    var a4 = this.SalePrice;
                    var a5 = this.CostPrice;
                    var a6 = this.Revenue;
                    var a7 = this.Stock;
                    var a8 = this.Weight;
                    var a9 = this.Image;
                    if (!a0 || !a1 || !a2 || !a3 || !a4 || !a5 || !a6 || !a7 || !a8 || !a9) {
                        return 'btn btn-danger btn-xs ';
                    } else {
                        return 'btn btn-success btn-xs ';
                    }
                } ,
                set: function(value) {}
            }) , Object.defineProperty(Product.prototype , 'profileStateIcon' , {
                get: function() {
                    var a0 = this.Title;
                    var a1 = this.Description;
                    var a2 = this.LastDateOfSale;
                    var a3 = this.Sku;
                    var a4 = this.SalePrice;
                    var a5 = this.CostPrice;
                    var a6 = this.Revenue;
                    var a7 = this.Stock;
                    var a8 = this.Weight;
                    var a9 = this.Image;
                    if (!a0 || !a1 || !a2 || !a3 || !a4 || !a5 || !a6 || !a7 || !a8 || !a9) {
                        return 'fa fa-asterisk fa-fw';
                    } else {
                        return 'fa fa-check fa-fw';
                    }
                } ,
                set: function(value) {}
            });
        }

    }

})();
// Oscar , to indent properly, remove one bracket from the end and put it right back

