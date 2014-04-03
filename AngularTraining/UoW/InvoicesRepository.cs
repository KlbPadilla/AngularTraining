using System.Data.Entity;
using System.Linq;
using AngularTraining.Models;
namespace AngularTraining.UoW
{
    public class InvoiceRepository : EFRepository<Invoice>, IInvoiceRepository
    {
        public InvoiceRepository(DbContext context) : base(context) { }
        //Get by Parent relationships dos
        public IQueryable<Invoice> GetByCustomerId(System.Guid id)
        {
            return DbSet.Where(em => em.CustomerId == id);
        }
        //Get by Parent relationships dos
        public IQueryable<Invoice> GetByEmployeeId(System.Guid id)
        {
            return DbSet.Where(em => em.EmployeeId == id);
        }
        //Get by Parent relationships dos
        public IQueryable<Invoice> GetByInvoiceTypeId(System.Guid id)
        {
            return DbSet.Where(em => em.InvoiceTypeId == id);
        }
        public IQueryable<Invoice> GetByInvoiceId(System.Guid id)
        {
            return DbSet.Include("InvoiceDetails").Where(em => em.InvoiceId == id);
        }
    }
}
