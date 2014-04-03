using System;
using System.Web.Optimization;
namespace AngularTraining
{
    public class BundleConfig {
        public static void RegisterBundles(BundleCollection bundles) {
            bundles.IgnoreList.Clear();
            AddDefaultIgnorePatterns(bundles.IgnoreList);
            bundles.Add(
              new ScriptBundle("~/Scripts/vendor")
               // .Include("~/Scripts/jquery-{version}.js")
              .Include("~/Scripts/jquery-2.0.3.min.js")
              .Include("~/Scripts/jquery-ui.js")
                 .Include("~/Scripts/jquery-ui-1.10.3.custom.min.js")
                .Include("~/Scripts/selectivizr.min.js")
                 .Include("~/Scripts/jquery.validate.min.js")
                   .Include("~/Scripts/jquery.simulate.js")
                .Include("~/Scripts/knockout-{version}.debug.js")
                .Include("~/Scripts/knockout.validation.js")
                //.Include("~/Scripts/knockout-sortable.min.js")
                //.Include("~/Scripts/knockout-repeat.js")
                //.Include("~/Scripts/knockout-delegatedEvents.min.js")
                   //.Include("~/Scripts/knockout-paged.js")
                .Include("~/Scripts/knockout-deferred-updates.js")  // https://github.com/mbest/knockout-deferred-updates  -- Michael Best
                .Include("~/Scripts/knockout-switch-case.js")       // https://github.com/mbest/knockout-switch-case -  --  Michael Best
                .Include("~/Scripts/knockout.punches.js")       // http://mbest.github.io/knockout.punches/ -- Michael Best
                .Include("~/Scripts/toastr.js")
                .Include("~/Scripts/Q.js")
                .Include("~/Scripts/breeze.debug.js")
                .Include("~/Scripts/breeze.savequeuing.js")
                .Include("~/Scripts/moment.js")
                 .Include("~/Scripts/bootstrap-datepicker.js")
              .Include("~/Scripts/moment-datepicker.js")
               .Include("~/Scripts/moment-datepicker-ko.js")
              //  .Include("~/Scripts/highcharts/highcharts.js")
              //  .Include("~/Scripts/highcharts/highcharts-more.js")
              .Include("~/Scripts/amplify.js")
                .Include("~/Scripts/string.js")
                .Include("~/Scripts/speakingurl.min.js")
            
                // Oscar Bootstrap UI
               
         
            
                .Include("~/Scripts/bootstrap.js")
                   .Include("~/Scripts/bootstrap-modalmanager.js")
                   .Include("~/Scripts/bootstrap-modal.js")
                .Include("~/Scripts/bootstrap-sortable.js")
                .Include("~/Scripts/jquery.dcjqaccordion.2.7.js")
                .Include("~/Scripts/jquery.scrollTo.min.js")
                .Include("~/Scripts/jquery.nicescroll.js")
                .Include("~/Scripts/jquery.dataTables.js")
                .Include("~/Scripts/DT_bootstrap.js")
               .Include("~/Scripts/form-validation-script.js")
               // .Include("~/Scripts/owl.carousel.js")
       
              
                .Include("~/Scripts/respond.min.js")
                .Include("~/Scripts/common-scripts.js")
             
            
              );
            bundles.Add(
                new StyleBundle("~/Content/css")
                    // TODO Set up development/production enviroments
                    .Include("~/Content/qunit.css")
                    .Include("~/Content/toastr.css")
           
                   // Oscar UI
                    .Include("~/Content/bootstrap.css")
   
                    // .Include("~/Content/bootstrap-reset.css")  // #################
                   //   .Include("~/Content/bootstrap-sortable.css")
                     .Include("~/Content/font-awesome.css")
                     .Include("~/Content/style.css")
                     .Include("~/Content/style-responsive.css")
                   
                    // .Include("~/Content/owl.carousel.css")
                     .Include("~/Content/datepicker.css")
                     // .Include("~/Content/App_Themes/Champagne/style.css")
                      .Include("~/Content/bootstrap-modal-bs3patch.css")
                     .Include("~/Content/bootstrap-modal.css")
                    //  .Include("~/Content/durandal.css")
                       .Include("~/Content/adv_table_page.css")
                        .Include("~/Content/adv_table_table.css")
                          .Include("~/Content/table-responsive.css")
                          .Include("~/Content/bootstrap-reset.css")
                );
            // bundles.Add(styleBundle);
        }
        public static void AddDefaultIgnorePatterns(IgnoreList ignoreList) {
            if(ignoreList == null) {
                throw new ArgumentNullException("ignoreList");
            }
            ignoreList.Ignore("*.intellisense.js");
            ignoreList.Ignore("*-vsdoc.js");
            //ignoreList.Ignore("*.debug.js", OptimizationMode.WhenEnabled);
            //ignoreList.Ignore("*.min.js", OptimizationMode.WhenDisabled);
            //ignoreList.Ignore("*.min.css", OptimizationMode.WhenDisabled);
        }
    }
}