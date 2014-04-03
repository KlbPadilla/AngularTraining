using System.Data.Entity.ModelConfiguration;
namespace AngularTraining.Models.Mapping
{
   public class InvoiceDetailMap : EntityTypeConfiguration<InvoiceDetail>
   {
       public InvoiceDetailMap()
       {
           this.ToTable("InvoiceDetails", "dbo");
       this.HasKey(t => t.InvoiceDetailId);
       this.Property(t => t.InvoiceDetailId).HasColumnName("InvoiceDetailId") ;
       this.Property(t => t.Qty).HasColumnName("Qty");
       this.Property(t => t.PriceWithDiscount).HasColumnName("PriceWithDiscount");
       this.Property(t => t.LineTax).HasColumnName("LineTax");
       this.Property(t => t.LineCommission).HasColumnName("LineCommission");
       this.Property(t => t.LineTotal).HasColumnName("LineTotal");
       this.Property(t => t.InvoiceId).HasColumnName("InvoiceId");
       this.Property(t => t.ProductId).HasColumnName("ProductId");
     
      // Relationships
           this.HasRequired(t => t.Invoices)
          .WithMany(t => t.InvoiceDetails)
          .HasForeignKey(d => d.InvoiceId);
     
           this.HasRequired(t => t.Products)
          .WithMany(t => t.InvoiceDetails)
          .HasForeignKey(d => d.ProductId);
     
       }
   }
}
