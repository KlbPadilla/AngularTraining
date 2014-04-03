using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
namespace AngularTraining.Models
{
    [System.ComponentModel.DataAnnotations.Schema.Table("ProductCategories", Schema = "dbo")]
    public class ProductCategory
    {
        public ProductCategory()
        {
            this.Products = new List<Product>();
        }
        [Display(Name = "Product Category Id")]
        [Key]
        public virtual System.Guid ProductCategoryId { get; set; }//IsPrimaryKey
        [StringLength(200, ErrorMessage = "max 200 Characters allowed ")]
        public string Category { get; set; }
        public virtual ICollection<Product> Products { get; set; }
    }
}
