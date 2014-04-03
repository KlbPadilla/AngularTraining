using System.ComponentModel.DataAnnotations;
using System.Runtime.Serialization;
namespace AngularTraining.Models
{
    //Parent
    //Invoice
    //Parent
    //Product
    [System.ComponentModel.DataAnnotations.Schema.Table("InvoiceDetails", Schema = "dbo")]
    public class InvoiceDetail
    {
        public InvoiceDetail()
        {
        }
        [Display(Name = "Invoice Detail Id")]
        [Key]
        public virtual System.Guid InvoiceDetailId { get; set; }//IsPrimaryKey
        // [Required(ErrorMessage = " please enter a value for Qty")]
        [DataMember(IsRequired = true)]
        public int Qty { get; set; }
        [Display(Name = "Price With Discount")]
        [Range(typeof(decimal), "0", "9999999999999999")]
        public decimal? PriceWithDiscount { get; set; }
        [Display(Name = "Line Tax")]
        [Range(typeof(decimal), "0", "9999999999999999")]
        public decimal? LineTax { get; set; }
        [Display(Name = "Line Commission")]
        [Range(typeof(decimal), "0", "9999999999999999")]
        public decimal? LineCommission { get; set; }
        [Display(Name = "Line Total")]
        [Range(typeof(decimal), "0", "9999999999999999")]
        public decimal? LineTotal { get; set; }
        [Display(Name = "Invoice Id")]
        public virtual Invoice Invoices { get; set; } // IsForeignKey
        [System.ComponentModel.DataAnnotations.Schema.DatabaseGenerated(System.ComponentModel.DataAnnotations.Schema.DatabaseGeneratedOption.None)]
        public System.Guid InvoiceId { get; set; }
        [Display(Name = "Product Id")]
        public virtual Product Products { get; set; } // IsForeignKey
        [System.ComponentModel.DataAnnotations.Schema.DatabaseGenerated(System.ComponentModel.DataAnnotations.Schema.DatabaseGeneratedOption.None)]
        public System.Guid ProductId { get; set; }
    }
}
