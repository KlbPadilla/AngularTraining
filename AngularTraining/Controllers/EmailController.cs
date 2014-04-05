namespace AngularTraining.Controllers
{
    using System.Net;
    using System.Net.Http;
    using System.Net.Mail;
    using System.Web.Http;

    public class EmailController : ApiController
    {
      
        [AcceptVerbs("GET", "POST")]
        [System.Web.Http.HttpPost]
        public HttpResponseMessage SendEmail()
        {
            MailMessage mail = new MailMessage();
            SmtpClient SmtpServer = new SmtpClient("smtp.gmail.com");
            mail.From = new MailAddress("oscar.f.agreda@gmail.com");
            mail.To.Add("oscar_agreda@xneterp.com");
            mail.To.Add("oscar_agreda@xneterp.com");
            mail.Subject = "Test Mail - 1";
            mail.Body = "mail with attachment";
            System.Net.Mail.Attachment attachment;
            attachment = new System.Net.Mail.Attachment("c:/Temp/u.zip");
            mail.Attachments.Add(attachment);
            SmtpServer.Port = 587;
            SmtpServer.Credentials = new System.Net.NetworkCredential("oscar.f.agreda@gmail.com", "Platinum66^");
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