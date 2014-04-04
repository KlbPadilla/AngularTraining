using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
namespace AngularTraining.Models
{
    [System.ComponentModel.DataAnnotations.Schema.Table("Customers", Schema = "dbo")]
    public class Customer
    {
        public Customer()
        {

        }
        [Display(Name = "Customer Id")]
        [Key]
        public virtual System.Guid CustomerId { get; set; }//IsPrimaryKey


        [Display(Name = "Is Company")]
        [Required(ErrorMessage = " Es para una empresa o individual")]
        public bool IsCompany { get; set; }


        [StringLength(100, ErrorMessage = "max 100 Characters allowed ")]
        [Required(ErrorMessage = " please enter a value for First Name")]
        public string FirstName { get; set; }

        [StringLength(100, ErrorMessage = "max 100 Characters allowed ")]
        [Required(ErrorMessage = " please enter a value for Last Name")]
        public string LastName { get; set; }

        [StringLength(50, ErrorMessage = "max 50 Characters allowed ")]
        public string MainEmail { get; set; }

        [StringLength(50, ErrorMessage = "max 50 Characters allowed ")]
        public string Phone { get; set; }


        [StringLength(50, ErrorMessage = "max 50 Characters allowed ")]
        public string Address1 { get; set; }

        [StringLength(50, ErrorMessage = "max 50 Characters allowed ")]
        public string Address2 { get; set; }

        [StringLength(50, ErrorMessage = "max 50 Characters allowed ")]
        public string City { get; set; }


        [StringLength(50, ErrorMessage = "max 50 Characters allowed ")]
        public string State { get; set; }



        [StringLength(150, ErrorMessage = "max 150 Characters allowed ")]
        public string FacebookPage { get; set; }


        [StringLength(150, ErrorMessage = "max 150 Characters allowed ")]
        public string TwitterPage { get; set; }


        [StringLength(150, ErrorMessage = "max 150 Characters allowed ")]
        public string LinkedinPage { get; set; }


        [StringLength(150, ErrorMessage = "max 150 Characters allowed ")]
        public string SkypeId { get; set; }


        [StringLength(150, ErrorMessage = "max 150 Characters allowed ")]
        public string GooglePlusId { get; set; }


        [Display(Name = "Date Of Birth")]
        public DateTime? DateOfBirth { get; set; }


        [Display(Name = "Sex Gender")]
        [StringLength(40, ErrorMessage = "max 40 Characters allowed ")]
        public string SexGender { get; set; }



        [Display(Name = "Image Path")]
        [StringLength(250, ErrorMessage = "max 250 Characters allowed ")]
        public string imagePath { get; set; }

        public string Notes { get; set; }


        [Required(ErrorMessage = " Ya cancelo ")]
        public bool Paid { get; set; }
      

    }
}
