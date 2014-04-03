using System.Data.Entity.ModelConfiguration;
namespace AngularTraining.Models.Mapping
{
   public class ProductCategoryMap : EntityTypeConfiguration<ProductCategory>
   {
       public ProductCategoryMap()
       {
           this.ToTable("ProductCategories", "dbo");
       this.HasKey(t => t.ProductCategoryId);
       this.Property(t => t.ProductCategoryId).HasColumnName("ProductCategoryId") ;
       this.Property(t => t.Category).HasColumnName("Category");
     
      // Relationships
       }
   }
}
