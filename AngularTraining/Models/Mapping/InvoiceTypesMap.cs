using System.Data.Entity.ModelConfiguration;
namespace AngularTraining.Models.Mapping
{
   public class InvoiceTypeMap : EntityTypeConfiguration<InvoiceType>
   {
       public InvoiceTypeMap()
       {
           this.ToTable("InvoiceTypes", "dbo");
       this.HasKey(t => t.InvoiceTypeId);
       this.Property(t => t.InvoiceTypeId).HasColumnName("InvoiceTypeId") ;
       this.Property(t => t.Type).HasColumnName("Type");
     
      // Relationships
       }
   }
}
