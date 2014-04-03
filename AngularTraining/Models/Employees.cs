using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
namespace AngularTraining.Models
{
    [System.ComponentModel.DataAnnotations.Schema.Table("Employees", Schema = "dbo")]
    public class Employee
    {
        public Employee()
        {
            this.Invoices = new List<Invoice>();
        }
        [Display(Name = "Employee Id")]
        [Key]
        public virtual System.Guid EmployeeId { get; set; }//IsPrimaryKey
        [Display(Name = "First Name")]
        [StringLength(100, ErrorMessage = "max 100 Characters allowed ")]
        public string FirstName { get; set; }
        [Display(Name = "Last Name")]
        [StringLength(100, ErrorMessage = "max 100 Characters allowed ")]
        public string LastName { get; set; }
        [Display(Name = "Date Of Birth")]
        public DateTime? DateOfBirth { get; set; }
        [Range(typeof(decimal), "0", "9999999999999999")]
        public decimal? Salary { get; set; }
        public System.Byte[] Photo { get; set; }
        [Display(Name = "Position Held")]
        [StringLength(100, ErrorMessage = "max 100 Characters allowed ")]
        public string PositionHeld { get; set; }
        public virtual ICollection<Invoice> Invoices { get; set; }
    }
}
