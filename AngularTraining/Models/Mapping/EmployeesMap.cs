using System.Data.Entity.ModelConfiguration;
namespace AngularTraining.Models.Mapping
{
   public class EmployeeMap : EntityTypeConfiguration<Employee>
   {
       public EmployeeMap()
       {
           this.ToTable("Employees", "dbo");
       this.HasKey(t => t.EmployeeId);
       this.Property(t => t.EmployeeId).HasColumnName("EmployeeId") ;
       this.Property(t => t.FirstName).HasColumnName("FirstName");
       this.Property(t => t.LastName).HasColumnName("LastName");
       this.Property(t => t.DateOfBirth).HasColumnName("DateOfBirth");
       this.Property(t => t.Salary).HasColumnName("Salary");
       this.Property(t => t.Photo).HasColumnName("Photo");
       this.Property(t => t.PositionHeld).HasColumnName("PositionHeld");
     
      // Relationships
       }
   }
}
