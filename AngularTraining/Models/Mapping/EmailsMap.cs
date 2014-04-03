using System.Data.Entity.ModelConfiguration;
namespace AngularTraining.Models.Mapping
{
   public class EmailMap : EntityTypeConfiguration<Email>
   {
       public EmailMap()
       {
           this.ToTable("Emails", "dbo");
       this.HasKey(t => t.EmailId);
       this.Property(t => t.EmailId).HasColumnName("EmailId") ;
       this.Property(t => t.IsMain).HasColumnName("IsMain");
       this.Property(t => t.EmailAddress).HasColumnName("EmailAddress");
       this.Property(t => t.EmailTypeId).HasColumnName("EmailTypeId");
       this.Property(t => t.Id).HasColumnName("Id");
     
      // Relationships
           this.HasRequired(t => t.EmailTypes)
          .WithMany(t => t.Emails)
          .HasForeignKey(d => d.EmailTypeId);
     
       }
   }
}
