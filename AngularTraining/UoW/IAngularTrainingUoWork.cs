namespace AngularTraining.UoW
{
    public interface IAngularTrainingUow
    {
       
        Breeze.ContextProvider.SaveResult Commit(Newtonsoft.Json.Linq.JObject changeSet);
  	 
        ICustomerRepository Customers { get; }
   
        IInvoiceDetailRepository InvoiceDetails { get; }
        IInvoiceRepository Invoices { get; }
   
    }
}
