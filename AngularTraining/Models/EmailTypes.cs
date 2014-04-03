using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
namespace AngularTraining.Models
{
    [System.ComponentModel.DataAnnotations.Schema.Table("EmailTypes", Schema = "dbo")]
    public class EmailType
    {
        public EmailType()
        {
            this.Emails = new List<Email>();
        }
        [Display(Name = "Email Type Id")]
        [Key]
        public virtual System.Guid EmailTypeId { get; set; }//IsPrimaryKey
        [StringLength(100, ErrorMessage = "max 100 Characters allowed ")]
        public string Type { get; set; }
        public virtual ICollection<Email> Emails { get; set; }
    }
}
