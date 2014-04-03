using System;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using AngularTraining.Models;
using AngularTraining.UoW;
namespace AngularTraining.Controllers
{
    [Authorize]
    public class CustomerController : ApiControllerBase
    {
        [Authorize]
        public IQueryable<Customer> GetCustomers()
        {
            return Uow.Customers.GetAll();
        }
        // GET api/Customer/GetById?id=
        [System.Web.Http.HttpGet]
        [Authorize]
        public Customer GetById(System.Guid id)
        {
            Customer customer = Uow.Customers.GetById(id);
            if (customer != null) return customer;
            var result = new HttpResponseException(new HttpResponseMessage(HttpStatusCode.NotFound));
            throw result;
        }
        [System.Web.Http.HttpPut]
        public HttpResponseMessage Put(Customer customer)
        {
            Uow.Customers.Update(customer);
            var result = new HttpResponseMessage(HttpStatusCode.NoContent);
            return result;
        }
        [System.Web.Http.HttpPost]
        public HttpResponseMessage Post(Customer customer)
        {
            customer = Uow.Customers.Add(customer);
            var response = Request.CreateResponse<Customer>(HttpStatusCode.Created, customer);
            string uri = Url.Route(null, new { id = customer.CustomerId });
            response.Headers.Location = new Uri(Request.RequestUri, uri);
            return response;
        }
        [System.Web.Http.HttpDelete]
        public HttpResponseMessage Delete(Customer customer)
        {
            Uow.Customers.Delete(customer);
            var result = new HttpResponseMessage(HttpStatusCode.NoContent);
            return result;
        }
    }
}
