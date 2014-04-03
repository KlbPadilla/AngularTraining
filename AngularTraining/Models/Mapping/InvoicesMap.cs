using System.Data.Entity.ModelConfiguration;
namespace AngularTraining.Models.Mapping
{
   public class InvoiceMap : EntityTypeConfiguration<Invoice>
   {
       public InvoiceMap()
       {
           this.ToTable("Invoices", "dbo");
       this.HasKey(t => t.InvoiceId);
       this.Property(t => t.InvoiceId).HasColumnName("InvoiceId") ;
       this.Property(t => t.DateOfSale).HasColumnName("DateOfSale");
       this.Property(t => t.DueDate).HasColumnName("DueDate");
       this.Property(t => t.ShipDate).HasColumnName("ShipDate");
       this.Property(t => t.PrintDocNumber).HasColumnName("PrintDocNumber");
       this.Property(t => t.ShipMethod).HasColumnName("ShipMethod");
       this.Property(t => t.SubTotal).HasColumnName("SubTotal");
       this.Property(t => t.TaxAmt).HasColumnName("TaxAmt");
       this.Property(t => t.Freight).HasColumnName("Freight");
       this.Property(t => t.TotalDue).HasColumnName("TotalDue");
       this.Property(t => t.Comment).HasColumnName("Comment");
       this.Property(t => t.ModifiedDate).HasColumnName("ModifiedDate");
       this.Property(t => t.Image).HasColumnName("Image");
       this.Property(t => t.CustomerId).HasColumnName("CustomerId");
       this.Property(t => t.EmployeeId).HasColumnName("EmployeeId");
       this.Property(t => t.InvoiceTypeId).HasColumnName("InvoiceTypeId");
     
      // Relationships
           this.HasRequired(t => t.Customers)
          .WithMany(t => t.Invoices)
          .HasForeignKey(d => d.CustomerId);
     
           this.HasRequired(t => t.Employees)
          .WithMany(t => t.Invoices)
          .HasForeignKey(d => d.EmployeeId);
     
           this.HasRequired(t => t.InvoiceTypes)
          .WithMany(t => t.Invoices)
          .HasForeignKey(d => d.InvoiceTypeId);
     
       }
   }
}
