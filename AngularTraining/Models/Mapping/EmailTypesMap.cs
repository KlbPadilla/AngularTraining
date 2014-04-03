using System.Data.Entity.ModelConfiguration;
namespace AngularTraining.Models.Mapping
{
   public class EmailTypeMap : EntityTypeConfiguration<EmailType>
   {
       public EmailTypeMap()
       {
           this.ToTable("EmailTypes", "dbo");
       this.HasKey(t => t.EmailTypeId);
       this.Property(t => t.EmailTypeId).HasColumnName("EmailTypeId") ;
       this.Property(t => t.Type).HasColumnName("Type");
     
      // Relationships
       }
   }
}
