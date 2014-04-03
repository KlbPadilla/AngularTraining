using System.Linq;
using AngularTraining.Models;
namespace AngularTraining.UoW
{
    public interface IInvoiceRepository : IRepository<Invoice>
    {
        //Get by Parent relationships 
        IQueryable<Invoice> GetByCustomerId(System.Guid id);
            
        IQueryable<Invoice> GetByEmployeeId(System.Guid id);
            
        IQueryable<Invoice> GetByInvoiceTypeId(System.Guid id);
            
        IQueryable<Invoice> GetByInvoiceId(System.Guid id);
    }
}
