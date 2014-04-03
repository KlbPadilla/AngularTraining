using System.ComponentModel.DataAnnotations;
using System.Runtime.Serialization;
namespace AngularTraining.Models
{
    //Parent
    //AddressType
    [System.ComponentModel.DataAnnotations.Schema.Table("Addresses", Schema = "dbo")]
    public class Address
    {
        public Address()
        {
        }
        [Display(Name = "Address Id")]
        [Key]
        public virtual System.Guid AddressId { get; set; }//IsPrimaryKey
        [Display(Name = "Is Main")]
        // [Required(ErrorMessage = " please enter a value for Is Main")]
        [DataMember(IsRequired = true)]
        public bool IsMain { get; set; }
        [Display(Name = "Address 1")]
        [StringLength(100, ErrorMessage = "max 100 Characters allowed ")]
        public string Address1 { get; set; }
        [Display(Name = "Address 2")]
        [StringLength(100, ErrorMessage = "max 100 Characters allowed ")]
        public string Address2 { get; set; }
        [StringLength(100, ErrorMessage = "max 100 Characters allowed ")]
        public string State { get; set; }
        public string Notes { get; set; }
        [StringLength(20, ErrorMessage = "max 20 Characters allowed ")]
        public string Zip { get; set; }
        [StringLength(40, ErrorMessage = "max 40 Characters allowed ")]
        public string Country { get; set; }
        [Display(Name = "Address Type Id")]
        public virtual AddressType AddressTypes { get; set; } // IsForeignKey
        [System.ComponentModel.DataAnnotations.Schema.DatabaseGenerated(System.ComponentModel.DataAnnotations.Schema.DatabaseGeneratedOption.None)]
        public System.Guid AddressTypeId { get; set; }
        // [Required(ErrorMessage = " please enter a value for Id")]
        [DataMember(IsRequired = true)]
        public System.Guid Id { get; set; }
    }
}
