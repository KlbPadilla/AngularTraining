using System;
using System.Data.Entity;
using System.Data.Entity.Infrastructure;
using System.Linq;
using AngularTraining.Models;
namespace AngularTraining.UoW
{
    /// <summary>
    /// The EF-dependent, generic repository for data access
    /// </summary>
    /// <typeparam name="T">Type of entity for this Repository.</typeparam>
    public class EFRepository<T> : IRepository<T> where T : class
    {
        public EFRepository(System.Data.Entity.DbContext dbContext)
        {
            if (dbContext == null) 
                throw new ArgumentNullException("dbContext");
            DbContext = dbContext;
            DbSet = DbContext.Set<T>();
        }
    
       protected System.Data.Entity.DbContext DbContext { get; set; }
  
       protected System.Data.Entity.DbSet<T> DbSet { get; set; }
  
       // http://grab.by/no6k
       // http://bit.ly/114Idtk
       public virtual Breeze.ContextProvider.EntityInfo EntityInfo(T entity)
       {
           return new Breeze.ContextProvider.EF6.EFContextProvider<AngularTrainingDbContext>().CreateEntityInfo(entity);
       }
  
       public virtual IQueryable<T> GetAll()
       {
           return DbSet;
       }
  
       public virtual DbSet<T> GetAllEntityResult()
       {
           return DbSet;
       }
  
       public virtual T GetById(System.Guid id)
       //public virtual T GetById(int id)
       {
           return DbSet.Find(id);
       }
      
       public virtual T Add(T entity)
       {
           DbEntityEntry dbEntityEntry = DbContext.Entry(entity);
           if (dbEntityEntry.State != System.Data.Entity.EntityState.Detached)
           {
               dbEntityEntry.State = System.Data.Entity.EntityState.Added; 
           }
           else
           {
               DbSet.Add(entity);
           }
           return entity;
       }
       public virtual void Update(T entity)
       {
           DbEntityEntry dbEntityEntry = DbContext.Entry(entity);
           if (dbEntityEntry.State == System.Data.Entity.EntityState.Detached)
           {
               DbSet.Attach(entity);
           }
           dbEntityEntry.State = System.Data.Entity.EntityState.Modified;
       }
       public virtual void Delete(T entity)
       {
           DbEntityEntry dbEntityEntry = DbContext.Entry(entity);
           if (dbEntityEntry.State != System.Data.Entity.EntityState.Deleted)
           {
               dbEntityEntry.State = System.Data.Entity.EntityState.Deleted;
           }
           else
           {
               DbSet.Attach(entity);
               DbSet.Remove(entity);
           }
       }
    }
}
  	  
    
