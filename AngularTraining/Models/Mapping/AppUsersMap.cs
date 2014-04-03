using System.Data.Entity.ModelConfiguration;
namespace AngularTraining.Models.Mapping
{
   public class AppUserMap : EntityTypeConfiguration<AppUser>
   {
       public AppUserMap()
       {
           this.ToTable("AppUsers", "dbo");
       this.HasKey(t => t.UserId);
       this.Property(t => t.UserId).HasColumnName("UserId") ;
       this.Property(t => t.Name).HasColumnName("Name");
       this.Property(t => t.SecurityLevel).HasColumnName("SecurityLevel");
     
      // Relationships
       }
   }
}
