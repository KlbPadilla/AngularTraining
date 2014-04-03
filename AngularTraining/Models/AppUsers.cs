using System.ComponentModel.DataAnnotations;
using System.Runtime.Serialization;
namespace AngularTraining.Models
{
    [System.ComponentModel.DataAnnotations.Schema.Table("AppUsers", Schema = "dbo")]
    public class AppUser
    {
        public AppUser()
        {
        }
        [Display(Name = "User Id")]
        [Key]
        public virtual System.Guid UserId { get; set; }//IsPrimaryKey
        [StringLength(230, ErrorMessage = "max 230 Characters allowed ")]
        public string Name { get; set; }
        [Display(Name = "Security Level")]
        // [Required(ErrorMessage = " please enter a value for Security Level")]
        [DataMember(IsRequired = true)]
        public int SecurityLevel { get; set; }
    }
}
