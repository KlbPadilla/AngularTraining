using System.ComponentModel.DataAnnotations;
using System.Runtime.Serialization;
namespace AngularTraining.Models
{
    //Parent
    //PhoneType
    [System.ComponentModel.DataAnnotations.Schema.Table("Phones", Schema = "dbo")]
    public class Phone
    {
        public Phone()
        {
        }
        [Display(Name = "Phone Id")]
        [Key]
        public virtual System.Guid PhoneId { get; set; }//IsPrimaryKey
        [Display(Name = "Is Main")]
        // [Required(ErrorMessage = " please enter a value for Is Main")]
        [DataMember(IsRequired = true)]
        public bool IsMain { get; set; }
        [StringLength(100, ErrorMessage = "max 100 Characters allowed ")]
        public string Extension { get; set; }
        [StringLength(100, ErrorMessage = "max 100 Characters allowed ")]
        public string Number { get; set; }
        [Display(Name = "Is Cell Phone")]
        // [Required(ErrorMessage = " please enter a value for Is Cell Phone")]
        [DataMember(IsRequired = true)]
        public bool IsCellPhone { get; set; }
        [Display(Name = "Phone Type Id")]
        public virtual PhoneType PhoneTypes { get; set; } // IsForeignKey
        [System.ComponentModel.DataAnnotations.Schema.DatabaseGenerated(System.ComponentModel.DataAnnotations.Schema.DatabaseGeneratedOption.None)]
        public System.Guid PhoneTypeId { get; set; }
        // [Required(ErrorMessage = " please enter a value for Id")]
        [DataMember(IsRequired = true)]
        public System.Guid Id { get; set; }
    }
}
