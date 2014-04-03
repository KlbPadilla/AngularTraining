using System.Data.Entity.ModelConfiguration;
namespace AngularTraining.Models.Mapping
{
   public class ProductMap : EntityTypeConfiguration<Product>
   {
       public ProductMap()
       {
           this.ToTable("Products", "dbo");
       this.HasKey(t => t.ProductId);
       this.Property(t => t.ProductId).HasColumnName("ProductId") ;
       this.Property(t => t.Name).HasColumnName("Name");
       this.Property(t => t.Description).HasColumnName("Description");
       this.Property(t => t.LastDateOfSale).HasColumnName("LastDateOfSale");
       this.Property(t => t.Sku).HasColumnName("Sku");
       this.Property(t => t.SalePrice).HasColumnName("SalePrice");
       this.Property(t => t.CostPrice).HasColumnName("CostPrice");
       this.Property(t => t.Revenue).HasColumnName("Revenue");
       this.Property(t => t.Stock).HasColumnName("Stock");
       this.Property(t => t.Weight).HasColumnName("Weight");
       this.Property(t => t.CanBeSold).HasColumnName("CanBeSold");
       this.Property(t => t.Image).HasColumnName("Image");
       this.Property(t => t.ProductCategoryId).HasColumnName("ProductCategoryId");
     
      // Relationships
           this.HasRequired(t => t.ProductCategories)
          .WithMany(t => t.Products)
          .HasForeignKey(d => d.ProductCategoryId);
     
       }
   }
}
