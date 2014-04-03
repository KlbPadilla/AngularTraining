using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
namespace AngularTraining.Models
{
    [System.ComponentModel.DataAnnotations.Schema.Table("AddressTypes", Schema = "dbo")]
    public class AddressType
    {
        public AddressType()
        {
            this.Addresses = new List<Address>();
        }
        [Display(Name = "Address Type Id")]
        [Key]
        public virtual System.Guid AddressTypeId { get; set; }//IsPrimaryKey
        [StringLength(100, ErrorMessage = "max 100 Characters allowed ")]
        public string Type { get; set; }
        public virtual ICollection<Address> Addresses { get; set; }
    }
}
