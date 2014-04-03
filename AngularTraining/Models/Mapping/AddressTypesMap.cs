using System.Data.Entity.ModelConfiguration;
namespace AngularTraining.Models.Mapping
{
   public class AddressTypeMap : EntityTypeConfiguration<AddressType>
   {
       public AddressTypeMap()
       {
           this.ToTable("AddressTypes", "dbo");
       this.HasKey(t => t.AddressTypeId);
       this.Property(t => t.AddressTypeId).HasColumnName("AddressTypeId") ;
       this.Property(t => t.Type).HasColumnName("Type");
     
      // Relationships
       }
   }
}
