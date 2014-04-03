using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
namespace AngularTraining.Models
{
    [System.ComponentModel.DataAnnotations.Schema.Table("PhoneTypes", Schema = "dbo")]
    public class PhoneType
    {
        public PhoneType()
        {
            this.Phones = new List<Phone>();
        }
        [Display(Name = "Phone Type Id")]
        [Key]
        public virtual System.Guid PhoneTypeId { get; set; }//IsPrimaryKey
        [StringLength(100, ErrorMessage = "max 100 Characters allowed ")]
        public string Type { get; set; }
        public virtual ICollection<Phone> Phones { get; set; }
    }
}
