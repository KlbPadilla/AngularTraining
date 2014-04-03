using System.Data.Entity;
using System.Linq;
using AngularTraining.Models;
namespace AngularTraining.UoW
{
    public class CustomerRepository : EFRepository<Customer>, ICustomerRepository
    {
        public CustomerRepository(DbContext context) : base(context) { }
        public IQueryable<Customer> GetByCustomerId(System.Guid id)
        {
            return DbSet.Include("Invoices").Where(em => em.CustomerId == id);
        }
    }
}
