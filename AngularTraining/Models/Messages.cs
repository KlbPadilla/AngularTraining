using System;
using System.ComponentModel.DataAnnotations;
using System.Runtime.Serialization;
namespace AngularTraining.Models
{
    [System.ComponentModel.DataAnnotations.Schema.Table("Messages", Schema = "dbo")]
    public class Message
    {
        public Message()
        {
        }
        [Display(Name = "Message Id")]
        [Key]
        public virtual System.Guid MessageId { get; set; }//IsPrimaryKey
        [Display(Name = "Date Of Post")]
        // [Required(ErrorMessage = " please enter a value for Date Of Post")]
        [DataMember(IsRequired = true)]
        public DateTime DateOfPost { get; set; }
        [Display(Name = "Message Text")]
        [StringLength(100, ErrorMessage = "max 100 Characters allowed ")]
        public string MessageText { get; set; }
        [Display(Name = "Can Delete")]
        // [Required(ErrorMessage = " please enter a value for Can Delete")]
        [DataMember(IsRequired = true)]
        public bool CanDelete { get; set; }
        // [Required(ErrorMessage = " please enter a value for Id")]
        [DataMember(IsRequired = true)]
        public System.Guid Id { get; set; }
    }
}
