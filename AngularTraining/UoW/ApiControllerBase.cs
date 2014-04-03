using AngularTraining.Models;
namespace AngularTraining.UoW
     
{
    [Breeze.WebApi2.BreezeController]
    public abstract class ApiControllerBase : System.Web.Http.ApiController
    {
        protected IAngularTrainingUow Uow = new AngularTrainingUow();
  	  
  	  
        [System.Web.Http.HttpGet]
        public string Metadata()
        {
            return new Breeze.ContextProvider.EF6.EFContextProvider<AngularTrainingDbContext>().Metadata();
        }
  	  
        [System.Web.Http.HttpPost]
        public Breeze.ContextProvider.SaveResult SaveChanges(Newtonsoft.Json.Linq.JObject saveBundle)
        {
            return Uow.Commit(saveBundle);
        }
    }
  	  
}
  	  
