using System.Data.Entity.ModelConfiguration;
namespace AngularTraining.Models.Mapping
{
   public class PhoneCallMap : EntityTypeConfiguration<PhoneCall>
   {
       public PhoneCallMap()
       {
           this.ToTable("PhoneCalls", "dbo");
       this.HasKey(t => t.PhoneCallId);
       this.Property(t => t.PhoneCallId).HasColumnName("PhoneCallId") ;
       this.Property(t => t.DateOfCall).HasColumnName("DateOfCall");
       this.Property(t => t.Notes).HasColumnName("Notes");
       this.Property(t => t.PhoneCallTypeId).HasColumnName("PhoneCallTypeId");
       this.Property(t => t.Id).HasColumnName("Id");
     
      // Relationships
           this.HasRequired(t => t.PhoneCallTypes)
          .WithMany(t => t.PhoneCalls)
          .HasForeignKey(d => d.PhoneCallTypeId);
     
       }
   }
}
