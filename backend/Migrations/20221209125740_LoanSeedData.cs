using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace SampleWeb.Migrations
{
    /// <inheritdoc />
    public partial class LoanSeedData : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.UpdateData(
                table: "Contact",
                keyColumn: "ContactId",
                keyValue: 1,
                column: "CreatedDate",
                value: "2022-12-09T22:57:40.5758513+10:00");

            migrationBuilder.InsertData(
                table: "Contact",
                columns: new[] { "ContactId", "CreatedDate", "CreatedUserId", "DateOfBirth", "FirstName", "IsActive", "LastModifiedDate", "LastName", "ModifiedUserId", "NextOnlineMeeting" },
                values: new object[] { 2, "2022-12-09T22:57:40.5758597+10:00", "1", new DateOnly(1985, 3, 5), "Minne", 1, null, "Driver", null, null });

            migrationBuilder.InsertData(
                table: "Loan",
                columns: new[] { "Id", "CreatedDate", "CreatedUserId", "IsActive", "LastModifiedDate", "LoanAmount", "ModifiedUserId" },
                values: new object[] { 1, "2022-12-09T22:57:40.5758615+10:00", "2", 1, null, 250000.00m, null });

            migrationBuilder.InsertData(
                table: "ContactDtoLoanDto",
                columns: new[] { "BorrowersId", "LoansId" },
                values: new object[,]
                {
                    { 1, 1 },
                    { 2, 1 }
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "ContactDtoLoanDto",
                keyColumns: new[] { "BorrowersId", "LoansId" },
                keyValues: new object[] { 1, 1 });

            migrationBuilder.DeleteData(
                table: "ContactDtoLoanDto",
                keyColumns: new[] { "BorrowersId", "LoansId" },
                keyValues: new object[] { 2, 1 });

            migrationBuilder.DeleteData(
                table: "Contact",
                keyColumn: "ContactId",
                keyValue: 2);

            migrationBuilder.DeleteData(
                table: "Loan",
                keyColumn: "Id",
                keyValue: 1);

            migrationBuilder.UpdateData(
                table: "Contact",
                keyColumn: "ContactId",
                keyValue: 1,
                column: "CreatedDate",
                value: "2022-12-09T16:38:54.5788810+10:00");
        }
    }
}
