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
        public DbSet<Address> Address { get; set; }
        public DbSet<AddressType> AddressType { get; set; }
        public DbSet<AppUser> AppUser { get; set; }
        public DbSet<Customer> Customer { get; set; }
        public DbSet<Email> Email { get; set; }
        public DbSet<EmailType> EmailType { get; set; }
        public DbSet<Employee> Employee { get; set; }
        public DbSet<InvoiceDetail> InvoiceDetail { get; set; }
        public DbSet<Invoice> Invoice { get; set; }
        public DbSet<InvoiceType> InvoiceType { get; set; }
        public DbSet<Message> Message { get; set; }
        public DbSet<PhoneCall> PhoneCall { get; set; }
        public DbSet<PhoneCallType> PhoneCallType { get; set; }
        public DbSet<Phone> Phone { get; set; }
        public DbSet<PhoneType> PhoneType { get; set; }
        public DbSet<ProductCategory> ProductCategory { get; set; }
        public DbSet<Product> Product { get; set; }
        protected override void OnModelCreating(DbModelBuilder modelBuilder)
        {
            // Use singular table names
            modelBuilder.Conventions.Remove<PluralizingTableNameConvention>();
         
            modelBuilder.Configurations.Add(new AddressMap());
            modelBuilder.Configurations.Add(new AddressTypeMap());
            modelBuilder.Configurations.Add(new AppUserMap());
            modelBuilder.Configurations.Add(new CustomerMap());
            modelBuilder.Configurations.Add(new EmailMap());
            modelBuilder.Configurations.Add(new EmailTypeMap());
            modelBuilder.Configurations.Add(new EmployeeMap());
            modelBuilder.Configurations.Add(new InvoiceDetailMap());
            modelBuilder.Configurations.Add(new InvoiceMap());
            modelBuilder.Configurations.Add(new InvoiceTypeMap());
            modelBuilder.Configurations.Add(new MessageMap());
            modelBuilder.Configurations.Add(new PhoneCallMap());
            modelBuilder.Configurations.Add(new PhoneCallTypeMap());
            modelBuilder.Configurations.Add(new PhoneMap());
            modelBuilder.Configurations.Add(new PhoneTypeMap());
            modelBuilder.Configurations.Add(new ProductCategoryMap());
            modelBuilder.Configurations.Add(new ProductMap());
        }
    }
}
