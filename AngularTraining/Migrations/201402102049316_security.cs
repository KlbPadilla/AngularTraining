namespace AngularTraining.Infrastructure.Data
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class security : DbMigration
    {
        public override void Up()
        {
            CreateTable(
                "dbo.UserProfiles",
                c => new
                    {
                        UserProfileId = c.Int(nullable: false, identity: true),
                        UserName = c.String(nullable: false, maxLength: 50),
                        Email = c.String(nullable: false, maxLength: 200),
                        DisplayName = c.String(maxLength: 50),
                        imagePath = c.String(maxLength: 300),
                        IsAdmin = c.Boolean(nullable: false),
                    })
                .PrimaryKey(t => t.UserProfileId);
            
            CreateTable(
                "dbo.UserRoles",
                c => new
                    {
                        UserRoleId = c.Int(nullable: false, identity: true),
                        RoleName = c.String(nullable: false, maxLength: 256),
                        IsSelected = c.Boolean(),
                        UserProfile_UserProfileId = c.Int(),
                    })
                .PrimaryKey(t => t.UserRoleId)
                .ForeignKey("dbo.UserProfiles", t => t.UserProfile_UserProfileId)
                .Index(t => t.UserProfile_UserProfileId);
            
        }
        
        public override void Down()
        {
            DropForeignKey("dbo.UserRoles", "UserProfile_UserProfileId", "dbo.UserProfiles");
            DropIndex("dbo.UserRoles", new[] { "UserProfile_UserProfileId" });
            DropTable("dbo.UserRoles");
            DropTable("dbo.UserProfiles");
        }
    }
}
