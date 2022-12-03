using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace SampleWeb.Migrations
{
    /// <inheritdoc />
    public partial class contacts : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Contact",
                columns: table => new
                {
                    ContactId = table.Column<int>(type: "INTEGER", nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    FirstName = table.Column<string>(type: "TEXT", nullable: true),
                    LastName = table.Column<string>(type: "TEXT", nullable: true),
                    DateOfBirth = table.Column<DateOnly>(type: "TEXT", nullable: true),
                    NextOnlineMeeting = table.Column<DateTimeOffset>(type: "TEXT", nullable: true),
                    LastModifiedDate = table.Column<DateTimeOffset>(type: "TEXT", nullable: true),
                    CreatedDate = table.Column<DateTimeOffset>(type: "TEXT", nullable: true),
                    CreatedUserId = table.Column<string>(type: "TEXT", nullable: false),
                    ModifiedUserId = table.Column<string>(type: "TEXT", nullable: true),
                    IsActive = table.Column<int>(type: "INTEGER", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Contact", x => x.ContactId);
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Contact");
        }
    }
}
