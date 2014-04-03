using System;
using System.ComponentModel.DataAnnotations;
using System.Runtime.Serialization;
namespace AngularTraining.Models
{
    //Parent
    //PhoneCallType
    [System.ComponentModel.DataAnnotations.Schema.Table("PhoneCalls", Schema = "dbo")]
    public class PhoneCall
    {
        public PhoneCall()
        {
        }
        [Display(Name = "Phone Call Id")]
        [Key]
        public virtual System.Guid PhoneCallId { get; set; }//IsPrimaryKey
        [Display(Name = "Date Of Call")]
        // [Required(ErrorMessage = " please enter a value for Date Of Call")]
        [DataMember(IsRequired = true)]
        public DateTime DateOfCall { get; set; }
        public string Notes { get; set; }
        [Display(Name = "Phone Call Type Id")]
        public virtual PhoneCallType PhoneCallTypes { get; set; } // IsForeignKey
        [System.ComponentModel.DataAnnotations.Schema.DatabaseGenerated(System.ComponentModel.DataAnnotations.Schema.DatabaseGeneratedOption.None)]
        public System.Guid PhoneCallTypeId { get; set; }
        // [Required(ErrorMessage = " please enter a value for Id")]
        [DataMember(IsRequired = true)]
        public System.Guid Id { get; set; }
    }
}
