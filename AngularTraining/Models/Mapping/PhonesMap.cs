using System.Data.Entity.ModelConfiguration;
namespace AngularTraining.Models.Mapping
{
   public class PhoneMap : EntityTypeConfiguration<Phone>
   {
       public PhoneMap()
       {
           this.ToTable("Phones", "dbo");
       this.HasKey(t => t.PhoneId);
       this.Property(t => t.PhoneId).HasColumnName("PhoneId") ;
       this.Property(t => t.IsMain).HasColumnName("IsMain");
       this.Property(t => t.Extension).HasColumnName("Extension");
       this.Property(t => t.Number).HasColumnName("Number");
       this.Property(t => t.IsCellPhone).HasColumnName("IsCellPhone");
       this.Property(t => t.PhoneTypeId).HasColumnName("PhoneTypeId");
       this.Property(t => t.Id).HasColumnName("Id");
     
      // Relationships
           this.HasRequired(t => t.PhoneTypes)
          .WithMany(t => t.Phones)
          .HasForeignKey(d => d.PhoneTypeId);
     
       }
   }
}
