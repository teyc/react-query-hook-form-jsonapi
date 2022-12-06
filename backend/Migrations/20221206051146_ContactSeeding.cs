using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace SampleWeb.Migrations
{
    /// <inheritdoc />
    public partial class ContactSeeding : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.InsertData(
                table: "Contact",
                columns: new[] { "ContactId", "CreatedDate", "CreatedUserId", "DateOfBirth", "FirstName", "IsActive", "LastModifiedDate", "LastName", "ModifiedUserId", "NextOnlineMeeting" },
                values: new object[] { 1, "2022-12-06T15:11:46.2593310+10:00", "1", new DateOnly(1985, 3, 5), "Max", 1, null, "Melwell", null, "2022-12-25T13:00:00.0000000+10:00" });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "Contact",
                keyColumn: "ContactId",
                keyValue: 1);
        }
    }
}
