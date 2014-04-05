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
    using System.Net;
    using System.Net.Http;
    using System.Net.Mail;

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


        [HttpGet]
        public HttpResponseMessage SendEmailMessage(string to, string subject, string body)
        {
            MailMessage mail = new MailMessage();
            SmtpClient SmtpServer = new SmtpClient("smtp.gmail.com");
            mail.From = new MailAddress("oscar.f.agreda@gmail.com");
            mail.To.Add("oscar_agreda@xneterp.com");
            mail.To.Add("oscar_agreda@xneterp.com");
            mail.Subject = "Test Mail - 1";
            mail.Body = "mail with attachment";
          //  System.Net.Mail.Attachment attachment;
           // attachment = new System.Net.Mail.Attachment("c:/Temp/u.zip");
           // mail.Attachments.Add(attachment);
            SmtpServer.Port = 587;
            SmtpServer.Credentials = new System.Net.NetworkCredential("oscar.f.agreda@gmail.com", "L3Tm3I5%$1^2%3!");
            SmtpServer.EnableSsl = true;
            //
            //var fromAddress = new MailAddress("from@gmail.com", "From Name");
            //var toAddress = new MailAddress("to@yahoo.com", "To Name");
            //const string fromPassword = "password";
            //const string subject = "test";
            //const string body = "Hey now!!";
            //SmtpServer.Host = "smtp.gmail.com";
            //SmtpServer.Port = 587;
            //SmtpServer.EnableSsl = true;
            //SmtpServer.DeliveryMethod = SmtpDeliveryMethod.Network;
            //SmtpServer.Credentials = new NetworkCredential(fromAddress.Address, fromPassword);
            //SmtpServer.Timeout = 20000;
            SmtpServer.Send(mail);
            var result = new HttpResponseMessage(HttpStatusCode.NoContent);
            return result;
        }
    }
}