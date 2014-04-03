using System.Data.Entity;
using System.Linq;
using AngularTraining.Models;
namespace AngularTraining.UoW
{
    public class InvoiceDetailRepository : EFRepository<InvoiceDetail>, IInvoiceDetailRepository
    {
        public InvoiceDetailRepository(DbContext context) : base(context) { }
        //Get by Parent relationships dos
        public IQueryable<InvoiceDetail> GetByInvoiceId(System.Guid id)
        {
            return DbSet.Where(em => em.InvoiceId == id);
        }
        //Get by Parent relationships dos
        public IQueryable<InvoiceDetail> GetByProductId(System.Guid id)
        {
            return DbSet.Where(em => em.ProductId == id);
        }
        public IQueryable<InvoiceDetail> GetByInvoiceDetailId(System.Guid id)
        {
            return DbSet.Where(em => em.InvoiceDetailId == id);
        }
    }
}
