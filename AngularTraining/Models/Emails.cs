using System.ComponentModel.DataAnnotations;
using System.Runtime.Serialization;
namespace AngularTraining.Models
{
    //Parent
    //EmailType
    [System.ComponentModel.DataAnnotations.Schema.Table("Emails", Schema = "dbo")]
    public class Email
    {
        public Email()
        {
        }
        [Display(Name = "Email Id")]
        [Key]
        public virtual System.Guid EmailId { get; set; }//IsPrimaryKey
        [Display(Name = "Is Main")]
        // [Required(ErrorMessage = " please enter a value for Is Main")]
        [DataMember(IsRequired = true)]
        public bool IsMain { get; set; }
        
        
        
        [Display(Name = "Email")]
        [StringLength(100, ErrorMessage = "max 100 Characters allowed ")]
        public string EmailAddress { get; set; }
        [Display(Name = "Email Type Id")]
        public virtual EmailType EmailTypes { get; set; } // IsForeignKey
        [System.ComponentModel.DataAnnotations.Schema.DatabaseGenerated(System.ComponentModel.DataAnnotations.Schema.DatabaseGeneratedOption.None)]
        public System.Guid EmailTypeId { get; set; }
        // [Required(ErrorMessage = " please enter a value for Id")]
        [DataMember(IsRequired = true)]
        public System.Guid Id { get; set; }
    }
}
