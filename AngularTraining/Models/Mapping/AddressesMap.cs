using System.Data.Entity.ModelConfiguration;
namespace AngularTraining.Models.Mapping
{
   public class AddressMap : EntityTypeConfiguration<Address>
   {
       public AddressMap()
       {
           this.ToTable("Addresses", "dbo");
       this.HasKey(t => t.AddressId);
       this.Property(t => t.AddressId).HasColumnName("AddressId") ;
       this.Property(t => t.IsMain).HasColumnName("IsMain");
       this.Property(t => t.Address1).HasColumnName("Address1");
       this.Property(t => t.Address2).HasColumnName("Address2");
       this.Property(t => t.State).HasColumnName("State");
       this.Property(t => t.Notes).HasColumnName("Notes");
       this.Property(t => t.Zip).HasColumnName("Zip");
       this.Property(t => t.Country).HasColumnName("Country");
       this.Property(t => t.AddressTypeId).HasColumnName("AddressTypeId");
       this.Property(t => t.Id).HasColumnName("Id");
     
      // Relationships
           this.HasRequired(t => t.AddressTypes)
          .WithMany(t => t.Addresses)
          .HasForeignKey(d => d.AddressTypeId);
     
       }
   }
}
