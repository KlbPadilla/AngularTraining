using System;
using System.Web.Http;
using System.Web.Http.Cors;
using AngularTraining.Authentication;
using AngularTraining.Authentication.Providers;
using Microsoft.AspNet.Identity;
using Microsoft.AspNet.Identity.EntityFramework;
using Microsoft.Owin;
using Microsoft.Owin.Cors;
using Microsoft.Owin.Security;
using Microsoft.Owin.Security.Cookies;
using Microsoft.Owin.Security.OAuth;
using Owin;
namespace AngularTraining
{
    /// <summary>
    /// Partial of the class used to start the web application
    /// </summary>
    public partial class Startup
    {
        /// <summary>
        /// Options for the authorization system to use when authenticating users
        /// </summary>
        public static OAuthAuthorizationServerOptions OAuthOptions { get; private set; }
        /// <summary>
        /// Factory function that returns a new instance of the UserManager
        /// </summary>
        public static Func<UserManager<IdentityUser>> UserManagerFactory { get; set; }
        public static string PublicClientId { get; private set; }
        /// <summary>
        /// Static constructor to initialize values on application runtime
        /// </summary>
        static Startup()
        {
            // The "service" (our application) certifying a user's authentication status
            PublicClientId = "self";
            // Sets the UserManagerFactory to an anonymous function that returns a new
            // instance of UserManager<IdentityUser>. This factory can be called from
            // anywhere in the application as Startup.UserManagerFactory() to get a properly
            // configured instance of the UserManager
            UserManagerFactory = () => new UserManager<IdentityUser>(new UserStore<IdentityUser>(new AuthenticationDbContext()));
            // http://stackoverflow.com/questions/19571131/how-to-implement-a-unit-of-work-containing-the-new-identityuser
            //http://stackoverflow.com/questions/20790990/why-does-the-asp-net-spa-template-instantiate-usermanager-once-for-all-requests
            // Options which the authentication system will use
            OAuthOptions = new OAuthAuthorizationServerOptions
            {
                // Point at which the Bearer token middleware will be mounted
                TokenEndpointPath = new PathString("/token"),
                // An implementation of the OAuthAuthorizationServerProvider which the middleware
                // will use for determining whether a user should be authenticated or not
                Provider = new ApplicationOAuthProvider(PublicClientId, UserManagerFactory),
                // How long a bearer token should be valid for
                AccessTokenExpireTimeSpan = TimeSpan.FromHours(24),
                // Allows authentication over HTTP instead of forcing HTTPS
                AllowInsecureHttp = true,
                AuthorizeEndpointPath = new PathString("/api/Account/ExternalLogin"),
            };
        }
        /// <summary>
        /// Configures the application to use the OAuthBearerToken middleware
        /// </summary>
        /// <param name="app">The application to mount the middleware on</param>
        public void ConfigureAuth(IAppBuilder app)
        {
          //  app.UseCookieAuthentication(new CookieAuthenticationOptions());
          //  app.UseExternalSignInCookie(DefaultAuthenticationTypes.ExternalBearer);
            app.UseCookieAuthentication(new CookieAuthenticationOptions
            {
                AuthenticationType = "Application",
                AuthenticationMode = AuthenticationMode.Passive,
                LoginPath = new PathString("/Login"),
                LogoutPath = new PathString("/Logout"),
            });
            app.SetDefaultSignInAsAuthenticationType("External");
        
            CorsOptions cors = new CorsOptions();
            app.UseCors(cors);
            // Mounts the middleware on the provided app with the options configured
            // above
            app.UseOAuthBearerTokens(OAuthOptions);
        //    app.UseMicrosoftAccountAuthentication(
        //clientId: "",
        //clientSecret: "");
        //    app.UseTwitterAuthentication(
        //        consumerKey: "",
        //        consumerSecret: "");
        //    app.UseFacebookAuthentication(
        //        appId: "",
        //        appSecret: "");
        //    app.UseGoogleAuthentication();
        }
    }
}
