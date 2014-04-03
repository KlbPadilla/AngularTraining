using System.Data.Entity;
using System.Linq;
namespace AngularTraining.UoW
{
    public interface IRepository<T> where T : class
    {
       IQueryable<T> GetAll();
      // T GetById(int id);
       T GetById(System.Guid id);
       T Add(T entity);
       void Update(T entity);
       void Delete(T entity);
       DbSet<T> GetAllEntityResult();
       Breeze.ContextProvider.EntityInfo EntityInfo(T entity);
    }
}
  	  
     
