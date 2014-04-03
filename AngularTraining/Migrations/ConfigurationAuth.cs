using System.Collections.Generic;
using System.Data.Entity.Migrations;
using AngularTraining.Authentication;
using Microsoft.AspNet.Identity;
using Microsoft.AspNet.Identity.EntityFramework;
namespace AngularTraining.Migrations
{
    /// <summary>
    /// Class handling configuration of migrations
    /// </summary>
    internal sealed class ConfigurationAuth : DbMigrationsConfiguration<AuthenticationDbContext>
    {
        /// <summary>
        /// Migrations configuration constructor
        /// </summary>
        public ConfigurationAuth()
        {
            AutomaticMigrationsEnabled = true;
            AutomaticMigrationDataLossAllowed = true;
        }
        /// <summary>
        /// Adds a default "admin" user to the database with a password of "password"
        /// </summary>
        /// <param name="context">A datastore access context</param>
        /// <returns>Whether adding the user exists in the database</returns>
        private bool AddUser(AuthenticationDbContext context)
        {
            // Identity result objects handle results from non-select operations
            // on the user datastore
            IdentityResult identityResult;
            // UserManager handles the management of a certain type of User, and it
            // requires a UserStore to handle the actual access to the datastore
            UserManager<IdentityUser> userManager = new UserManager<IdentityUser>(new UserStore<IdentityUser>(context));
            // Create a new user as a POCO
            var user = new IdentityUser()
            {
                UserName = "admin"
            };
            // Check if the user already exists. If so, the user exists so report true
            if (userManager.FindByName(user.UserName) != null)
            {
                return true;
            }
            // Since the user does not exist, attempt to create the user
            identityResult = userManager.Create(user, "password");
            // Pass back the result of attempting to create the user
            return identityResult.Succeeded;
        }
   
        /// <summary>
        /// Function that will be run on upwards migrations of the database
        /// </summary>
        /// <param name="context">A datastpre access context</param>
        protected override void Seed(AuthenticationDbContext context)
        {
            // Add a default user to the database
            AddUser(context);
            // Add Oscar user to the database
            AddUserOscar(context);
            // Then save them to the database
            context.SaveChanges();
            // Now grab the database versions
         
        }
        /// <summary>
        /// Adds a default "oscar" user to the database with a password of "password"
        /// </summary>
        /// <param name="context">A datastore access context</param>
        /// <returns>Whether adding the user exists in the database</returns>
        private bool AddUserOscar(AuthenticationDbContext context)
        {
            // Identity result objects handle results from non-select operations
            // on the user datastore
            IdentityResult identityResult;
            // UserManager handles the management of a certain type of User, and it
            // requires a UserStore to handle the actual access to the datastore
            UserManager<IdentityUser> userManager = new UserManager<IdentityUser>(new UserStore<IdentityUser>(context));
            // Create a new user as a POCO
            var user = new IdentityUser()
            {
                UserName = "oscar"
            };
            // Check if the user already exists. If so, the user exists so report true
            if (userManager.FindByName(user.UserName) != null)
            {
                return true;
            }
            // Since the user does not exist, attempt to create the user
            identityResult = userManager.Create(user, "password");
            // Pass back the result of attempting to create the user
            return identityResult.Succeeded;
        }
    }
}