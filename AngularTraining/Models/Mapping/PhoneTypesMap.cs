using System.Data.Entity.ModelConfiguration;
namespace AngularTraining.Models.Mapping
{
   public class PhoneTypeMap : EntityTypeConfiguration<PhoneType>
   {
       public PhoneTypeMap()
       {
           this.ToTable("PhoneTypes", "dbo");
       this.HasKey(t => t.PhoneTypeId);
       this.Property(t => t.PhoneTypeId).HasColumnName("PhoneTypeId") ;
       this.Property(t => t.Type).HasColumnName("Type");
     
      // Relationships
       }
   }
}
