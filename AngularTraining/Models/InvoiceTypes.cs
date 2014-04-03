using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
namespace AngularTraining.Models
{
    [System.ComponentModel.DataAnnotations.Schema.Table("InvoiceTypes", Schema = "dbo")]
    public class InvoiceType
    {
        public InvoiceType()
        {
            this.Invoices = new List<Invoice>();
        }
        [Display(Name = "Invoice Type Id")]
        [Key]
        public virtual System.Guid InvoiceTypeId { get; set; }//IsPrimaryKey
        [StringLength(100, ErrorMessage = "max 100 Characters allowed ")]
        public string Type { get; set; }
        public virtual ICollection<Invoice> Invoices { get; set; }
    }
}
