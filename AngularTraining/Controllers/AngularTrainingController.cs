using Breeze.ContextProvider;
using Breeze.ContextProvider.EF6;
using Breeze.WebApi2;
using AngularTraining.Models;
using Newtonsoft.Json.Linq;
using System;
using System.Linq;
using System.Web.Http;
namespace AngularTraining.Controllers
{
   
    [BreezeController]
    public class AngularTrainingController : ApiController
    {
        private readonly EFContextProvider<AngularTrainingDbContext> _contextProvider = new EFContextProvider<AngularTrainingDbContext>();
      
        public AngularTrainingController()
        {
            _contextProvider.Context.Configuration.ProxyCreationEnabled = false; // Do NOT enable proxied entities, else serialization fails sometimes
            _contextProvider.Context.Configuration.LazyLoadingEnabled = false; // Load navigation properties explicitly (avoid serialization trouble)
            _contextProvider.Context.Configuration.AutoDetectChangesEnabled = true;
            _contextProvider.Context.Configuration.ValidateOnSaveEnabled = true;
        }
        #region Breeze Support methods.
        [HttpGet]
        public string Metadata()
        {
            return _contextProvider.Metadata();
        }
        [HttpPost]
        public SaveResult SaveChanges(JObject saveBundle)
        {
            try
            {
                return _contextProvider.SaveChanges(saveBundle);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
        #endregion Breeze Support methods.
     
     

        [HttpGet]
    
        public IQueryable<Customer> GetCustomers()
        {
            return _contextProvider.Context.Customer;
        }
      
    }
}