using System.Web.Http.Cors;
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
    [Authorize]
    [BreezeController]
    [EnableCors(origins: "http://localhost:1499", headers: "apiKey,Authorization,Access-Control-Allow-Origin", methods: "*", exposedHeaders: "Access-Control-Allow-Origin", SupportsCredentials = true)]
    public class AngularTrainingController : ApiController
    {
        private readonly EFContextProvider<AngularTrainingDbContext> _contextProvider = new EFContextProvider<AngularTrainingDbContext>();
        private readonly AngularTrainingDbContext db = new AngularTrainingDbContext();
        public AngularTrainingController()
        {
            _contextProvider.Context.Configuration.ProxyCreationEnabled = false; // Do NOT enable proxied entities, else serialization fails sometimes
            _contextProvider.Context.Configuration.LazyLoadingEnabled = false; // Load navigation properties explicitly (avoid serialization trouble)
            _contextProvider.Context.Configuration.AutoDetectChangesEnabled = true;
            _contextProvider.Context.Configuration.ValidateOnSaveEnabled = true;
        }
        #region Breeze Support methods.
        [HttpGet, Authorize]
        public string Metadata()
        {
            return _contextProvider.Metadata();
        }
        [HttpPost, Authorize]
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
        #region UserSessionId
        /// <summary>
        /// Get the UserSessionId from value in the request header
        /// </summary>
        private Guid getUserSessionId()
        {
            try
            {
                var id = Request.Headers.GetValues("X-UserSessionId").First();
                return Guid.Parse(id);
            }
            catch
            {
                return Guid.Empty;
            }
        }
        #endregion UserSessionId
        [HttpGet, Authorize]
        public IQueryable<Address> GetAddresses()
        {
            return _contextProvider.Context.Address;
        }
        [HttpGet, Authorize]
        public IQueryable<AddressType> GetAddressTypes()
        {
            return _contextProvider.Context.AddressType;
        }
        [HttpGet, Authorize]
        public IQueryable<AppUser> GetAppUsers()
        {
            return _contextProvider.Context.AppUser;
        }
        [HttpGet, Authorize]
        [EnableCors("*", "*", "GET, POST, OPTIONS")]
        public IQueryable<Customer> GetCustomers()
        {
            return _contextProvider.Context.Customer;
        }
        [HttpGet, Authorize]
        public IQueryable<Email> GetEmails()
        {
            return _contextProvider.Context.Email;
        }
        [HttpGet, Authorize]
        public IQueryable<EmailType> GetEmailTypes()
        {
            return _contextProvider.Context.EmailType;
        }
        [HttpGet, Authorize]
        public IQueryable<Employee> GetEmployees()
        {
            return _contextProvider.Context.Employee;
        }
        [HttpGet, Authorize]
        public IQueryable<InvoiceDetail> GetInvoiceDetails()
        {
            return _contextProvider.Context.InvoiceDetail;
        }
        [HttpGet, Authorize]
        public IQueryable<Invoice> GetInvoices()
        {
            return _contextProvider.Context.Invoice;
        }
        [HttpGet, Authorize]
        public IQueryable<InvoiceType> GetInvoiceTypes()
        {
            return _contextProvider.Context.InvoiceType;
        }
        [HttpGet, Authorize]
        public IQueryable<Message> GetMessages()
        {
            return _contextProvider.Context.Message;
        }
        [HttpGet, Authorize]
        public IQueryable<PhoneCall> GetPhoneCalls()
        {
            return _contextProvider.Context.PhoneCall;
        }
        [HttpGet, Authorize]
        public IQueryable<PhoneCallType> GetPhoneCallTypes()
        {
            return _contextProvider.Context.PhoneCallType;
        }
        [HttpGet, Authorize]
        public IQueryable<Phone> GetPhones()
        {
            return _contextProvider.Context.Phone;
        }
        [HttpGet, Authorize]
        public IQueryable<PhoneType> GetPhoneTypes()
        {
            return _contextProvider.Context.PhoneType;
        }
        [HttpGet, Authorize]
        public IQueryable<ProductCategory> GetProductCategories()
        {
            return _contextProvider.Context.ProductCategory;
        }
        [HttpGet, Authorize]
        public IQueryable<Product> GetProducts()
        {
            return _contextProvider.Context.Product;
        }
    }
}