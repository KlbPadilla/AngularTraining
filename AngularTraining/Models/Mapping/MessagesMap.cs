using System.Data.Entity.ModelConfiguration;
namespace AngularTraining.Models.Mapping
{
   public class MessageMap : EntityTypeConfiguration<Message>
   {
       public MessageMap()
       {
           this.ToTable("Messages", "dbo");
       this.HasKey(t => t.MessageId);
       this.Property(t => t.MessageId).HasColumnName("MessageId") ;
       this.Property(t => t.DateOfPost).HasColumnName("DateOfPost");
       this.Property(t => t.MessageText).HasColumnName("MessageText");
       this.Property(t => t.CanDelete).HasColumnName("CanDelete");
       this.Property(t => t.Id).HasColumnName("Id");
     
      // Relationships
       }
   }
}
