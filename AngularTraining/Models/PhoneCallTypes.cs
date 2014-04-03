using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
namespace AngularTraining.Models
{
    [System.ComponentModel.DataAnnotations.Schema.Table("PhoneCallTypes", Schema = "dbo")]
    public class PhoneCallType
    {
        public PhoneCallType()
        {
            this.PhoneCalls = new List<PhoneCall>();
        }
        [Display(Name = "Phone Call Type Id")]
        [Key]
        public virtual System.Guid PhoneCallTypeId { get; set; }//IsPrimaryKey
        [StringLength(100, ErrorMessage = "max 100 Characters allowed ")]
        public string Type { get; set; }
        public virtual ICollection<PhoneCall> PhoneCalls { get; set; }
    }
}
