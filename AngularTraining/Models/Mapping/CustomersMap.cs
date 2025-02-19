using System.Data.Entity.ModelConfiguration;
namespace AngularTraining.Models.Mapping
{
   public class CustomerMap : EntityTypeConfiguration<Customer>
   {
       public CustomerMap()
       {
           this.ToTable("Customers", "dbo");
       this.HasKey(t => t.CustomerId);
       this.Property(t => t.CustomerId).HasColumnName("CustomerId") ;
       this.Property(t => t.IsCompany).HasColumnName("IsCompany");
       this.Property(t => t.FirstName).HasColumnName("FirstName");
       this.Property(t => t.LastName).HasColumnName("LastName");
       this.Property(t => t.MainEmail).HasColumnName("MainEmail");

       this.Property(t => t.Address1).HasColumnName("Address1");
       this.Property(t => t.Address2).HasColumnName("Address2");
       this.Property(t => t.City).HasColumnName("City");
       this.Property(t => t.State).HasColumnName("State");
       this.Property(t => t.Phone).HasColumnName("Phone");


       this.Property(t => t.FacebookPage).HasColumnName("FacebookPage");
       this.Property(t => t.TwitterPage).HasColumnName("TwitterPage");
       this.Property(t => t.LinkedinPage).HasColumnName("LinkedinPage");
       this.Property(t => t.SkypeId).HasColumnName("SkypeId");
       this.Property(t => t.GooglePlusId).HasColumnName("GooglePlusId");
       this.Property(t => t.DateOfBirth).HasColumnName("DateOfBirth");
       this.Property(t => t.SexGender).HasColumnName("SexGender");
       this.Property(t => t.imagePath).HasColumnName("imagePath");
       this.Property(t => t.Notes).HasColumnName("Notes");
       this.Property(t => t.Paid).HasColumnName("Paid");
     
      // Relationships
       }
   }
}
