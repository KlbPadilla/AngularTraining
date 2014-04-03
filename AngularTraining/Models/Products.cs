using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Runtime.Serialization;
namespace AngularTraining.Models
{
    //Parent
    //ProductCategory
    [System.ComponentModel.DataAnnotations.Schema.Table("Products", Schema = "dbo")]
    public class Product
    {
        public Product()
        {
            this.InvoiceDetails = new List<InvoiceDetail>();
        }
        [Display(Name = "Product Id")]
        [Key]
        public virtual System.Guid ProductId { get; set; }//IsPrimaryKey
        [StringLength(100, ErrorMessage = "max 100 Characters allowed ")]
        public string Name { get; set; }
        [StringLength(250, ErrorMessage = "max 250 Characters allowed ")]
        public string Description { get; set; }
        [Display(Name = "Last Date Of Sale")]
        // [Required(ErrorMessage = " please enter a value for Last Date Of Sale")]
        [DataMember(IsRequired = true)]
        public DateTime LastDateOfSale { get; set; }
        [StringLength(30, ErrorMessage = "max 30 Characters allowed ")]
        public string Sku { get; set; }
        [Display(Name = "Sale Price")]
        // [Required(ErrorMessage = " please enter a value for Sale Price")]
        [DataMember(IsRequired = true)]
        [Range(typeof(decimal), "0", "9999999999999999")]
        public decimal SalePrice { get; set; }
        [Display(Name = "Cost Price")]
        // [Required(ErrorMessage = " please enter a value for Cost Price")]
        [DataMember(IsRequired = true)]
        [Range(typeof(decimal), "0", "9999999999999999")]
        public decimal CostPrice { get; set; }
        // [Required(ErrorMessage = " please enter a value for Revenue")]
        [DataMember(IsRequired = true)]
        [Range(typeof(decimal), "0", "9999999999999999")]
        public decimal Revenue { get; set; }
        // [Required(ErrorMessage = " please enter a value for Stock")]
        [DataMember(IsRequired = true)]
        public int Stock { get; set; }
        [StringLength(200, ErrorMessage = "max 200 Characters allowed ")]
        public string Weight { get; set; }
        [Display(Name = "Can Be Sold")]
        // [Required(ErrorMessage = " please enter a value for Can Be Sold")]
        [DataMember(IsRequired = true)]
        public bool CanBeSold { get; set; }
        public System.Byte[] Image { get; set; }
        [Display(Name = "Product Category Id")]
        public virtual ProductCategory ProductCategories { get; set; } // IsForeignKey
        [System.ComponentModel.DataAnnotations.Schema.DatabaseGenerated(System.ComponentModel.DataAnnotations.Schema.DatabaseGeneratedOption.None)]
        public System.Guid ProductCategoryId { get; set; }
        public virtual ICollection<InvoiceDetail> InvoiceDetails { get; set; }
    }
}
