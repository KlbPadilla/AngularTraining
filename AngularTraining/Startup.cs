using System.Web.Http;
using System.Web.Mvc;
using System.Web.Routing;
using AngularTraining;
using AngularTraining.App_Start;
using Microsoft.Owin;
using Microsoft.Owin.Cors;
using Owin;
/// This assembly attribute directs Microsoft.Owin to use the Startup class
/// defined in this file as the start of our application
[assembly: OwinStartup(typeof(Startup))]
namespace AngularTraining
{
    /// <summary>
    /// Startup class used by OWIN implementations to run the Web application
    /// </summary>
    public partial class Startup
    {
        /// <summary>
        /// Used to create an instance of the Web application 
        /// </summary>
        /// <param name="app">Parameter supplied by OWIN implementation which our configuration is connected to</param>
        public void Configuration(IAppBuilder app)
        {
            HttpConfiguration config = new HttpConfiguration();
            // Handles registration of the Web API's routes
            WebApiConfig.Register(config);
            // desde
            AreaRegistration.RegisterAllAreas();
            WebApiConfig.Register(GlobalConfiguration.Configuration);
            FilterConfig.RegisterGlobalFilters(GlobalFilters.Filters);
            RouteConfig.RegisterRoutes(RouteTable.Routes);
            // BundleConfig.RegisterBundles(BundleTable.Bundles);
           
               GlobalConfiguration.Configuration.Formatters.Remove(GlobalConfiguration.Configuration.Formatters.XmlFormatter);
            // hasta
            // Enables us to call the Web API from domains other than the ones the API responds to
            app.UseCors(CorsOptions.AllowAll);
            // Wire-in the authentication middleware
              ConfigureAuth(app);
            // Add the Web API framework to the app's pipeline
              config.SuppressDefaultHostAuthentication();
              config.Filters.Add(new HostAuthenticationFilter(Startup.OAuthOptions.AuthenticationType));
            app.UseWebApi(config);
        }
    }
}