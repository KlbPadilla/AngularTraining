using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Runtime.Serialization;
namespace AngularTraining.Models
{
    //Parent
    //Customer
    //Parent
    //Employee
    //Parent
    //InvoiceType
    [System.ComponentModel.DataAnnotations.Schema.Table("Invoices", Schema = "dbo")]
    public class Invoice
    {
        public Invoice()
        {
            this.InvoiceDetails = new List<InvoiceDetail>();
        }
        [Display(Name = "Invoice Id")]
        [Key]
        public virtual System.Guid InvoiceId { get; set; }//IsPrimaryKey
        [Display(Name = "Date Of Sale")]
        // [Required(ErrorMessage = " please enter a value for Date Of Sale")]
        [DataMember(IsRequired = true)]
        public DateTime DateOfSale { get; set; }
        [Display(Name = "Due Date")]
        public DateTime? DueDate { get; set; }
        [Display(Name = "Ship Date")]
        public DateTime? ShipDate { get; set; }
        [Display(Name = "Print Doc Number")]
        [StringLength(100, ErrorMessage = "max 100 Characters allowed ")]
        public string PrintDocNumber { get; set; }
        [Display(Name = "Ship Method")]
        [StringLength(200, ErrorMessage = "max 200 Characters allowed ")]
        public string ShipMethod { get; set; }
        [Display(Name = "Sub Total")]
        [Range(typeof(decimal), "0", "9999999999999999")]
        public decimal? SubTotal { get; set; }
        [Display(Name = "Tax Amt")]
        [Range(typeof(decimal), "0", "9999999999999999")]
        public decimal? TaxAmt { get; set; }
        [Range(typeof(decimal), "0", "9999999999999999")]
        public decimal? Freight { get; set; }
        [Display(Name = "Total Due")]
        // [Required(ErrorMessage = " please enter a value for Total Due")]
        [DataMember(IsRequired = true)]
        [Range(typeof(decimal), "0", "9999999999999999")]
        public decimal TotalDue { get; set; }
        public string Comment { get; set; }
        [Display(Name = "Modified Date")]
        public DateTime? ModifiedDate { get; set; }
        public System.Byte[] Image { get; set; }
        [Display(Name = "Customer Id")]
        public virtual Customer Customers { get; set; } // IsForeignKey
        [System.ComponentModel.DataAnnotations.Schema.DatabaseGenerated(System.ComponentModel.DataAnnotations.Schema.DatabaseGeneratedOption.None)]
        public System.Guid CustomerId { get; set; }
        [Display(Name = "Employee Id")]
        public virtual Employee Employees { get; set; } // IsForeignKey
        [System.ComponentModel.DataAnnotations.Schema.DatabaseGenerated(System.ComponentModel.DataAnnotations.Schema.DatabaseGeneratedOption.None)]
        public System.Guid EmployeeId { get; set; }
        [Display(Name = "Invoice Type Id")]
        public virtual InvoiceType InvoiceTypes { get; set; } // IsForeignKey
        [System.ComponentModel.DataAnnotations.Schema.DatabaseGenerated(System.ComponentModel.DataAnnotations.Schema.DatabaseGeneratedOption.None)]
        public System.Guid InvoiceTypeId { get; set; }
        public virtual ICollection<InvoiceDetail> InvoiceDetails { get; set; }
    }
}
