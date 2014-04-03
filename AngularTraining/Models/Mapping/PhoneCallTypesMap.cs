using System.Data.Entity.ModelConfiguration;
namespace AngularTraining.Models.Mapping
{
   public class PhoneCallTypeMap : EntityTypeConfiguration<PhoneCallType>
   {
       public PhoneCallTypeMap()
       {
           this.ToTable("PhoneCallTypes", "dbo");
       this.HasKey(t => t.PhoneCallTypeId);
       this.Property(t => t.PhoneCallTypeId).HasColumnName("PhoneCallTypeId") ;
       this.Property(t => t.Type).HasColumnName("Type");
     
      // Relationships
       }
   }
}
