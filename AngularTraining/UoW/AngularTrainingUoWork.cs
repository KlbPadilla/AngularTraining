using AngularTraining.Models;
namespace AngularTraining.UoW
{
    public class AngularTrainingUow : IAngularTrainingUow
    {
    
        private readonly Breeze.ContextProvider.EF6.EFContextProvider<AngularTrainingDbContext> DbContext;
    
        public AngularTrainingUow()
        {
            DbContext = new Breeze.ContextProvider.EF6.EFContextProvider<AngularTrainingDbContext>();
            // Do NOT enable proxied entities, else serialization fails
            DbContext.Context.Configuration.ProxyCreationEnabled = false;
            // Load navigation properties explicitly (avoid serialization trouble)
            // You have to specifically set ProxyCreationEnabled = false if you want to set LazyLoadingEnabled = true.
            DbContext.Context.Configuration.LazyLoadingEnabled = true;
            // if  Web API will perform validation, only then we don't need/want EF to do so
            DbContext.Context.Configuration.ValidateOnSaveEnabled = false;
            DbContext.Context.Configuration.AutoDetectChangesEnabled = true;
   
        Customers= new CustomerRepository(DbContext.Context);
     
        InvoiceDetails= new InvoiceDetailRepository(DbContext.Context);
        Invoices= new InvoiceRepository(DbContext.Context);
   
        }
  
        public ICustomerRepository  Customers { get; private set; }
        public IInvoiceDetailRepository  InvoiceDetails { get; private set; }
        public IInvoiceRepository  Invoices { get; private set; }
   
        public Breeze.ContextProvider.SaveResult Commit(Newtonsoft.Json.Linq.JObject changeSet)
        {
            return DbContext.SaveChanges(changeSet);
        }
   
        //// put this inside DbConctext Ctor
        // #### remember that in the case of EDMX it gets destroyed everytime is generated
    
    
    }
}
