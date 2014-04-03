using System.Linq;
using AngularTraining.Models;
namespace AngularTraining.UoW
{
    public interface IInvoiceDetailRepository : IRepository<InvoiceDetail>
    {
        //Get by Parent relationships 
        IQueryable<InvoiceDetail> GetByInvoiceId(System.Guid id);
            
        IQueryable<InvoiceDetail> GetByProductId(System.Guid id);
            
        IQueryable<InvoiceDetail> GetByInvoiceDetailId(System.Guid id);
    }
}
