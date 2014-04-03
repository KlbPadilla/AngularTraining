using System.Data.Entity;
using System.Data.Entity.ModelConfiguration.Conventions;
using AngularTraining.Models.Mapping;
namespace AngularTraining.Models
{
    public class AngularTrainingDbContext : DbContext
    {
        static AngularTrainingDbContext()
        {
            Database.SetInitializer<AngularTrainingDbContext>(null);
        }
		public AngularTrainingDbContext()
			: base("Name=AngularTrainingDbContext")
		{
		// ProxyCreationEnabled http://msdn.microsoft.com/en-US/data/jj592886
		}
     
        public DbSet<Customer> Customer { get; set; }
       
        protected override void OnModelCreating(DbModelBuilder modelBuilder)
        {
            // Use singular table names
            modelBuilder.Conventions.Remove<PluralizingTableNameConvention>();
         
         
            modelBuilder.Configurations.Add(new CustomerMap());
          
        }
    }
}
