using System.Linq;
using AngularTraining.Models;
namespace AngularTraining.UoW
{
    public interface ICustomerRepository : IRepository<Customer>
    {
        IQueryable<Customer> GetByCustomerId(System.Guid id);
    }
}
