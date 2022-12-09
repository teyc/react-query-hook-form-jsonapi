using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace SampleWeb.Migrations
{
    /// <inheritdoc />
    public partial class LoanDto : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Loan",
                columns: table => new
                {
                    Id = table.Column<int>(type: "INTEGER", nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    LoanAmount = table.Column<decimal>(type: "TEXT", nullable: true),
                    LastModifiedDate = table.Column<string>(type: "TEXT", nullable: true),
                    CreatedDate = table.Column<string>(type: "TEXT", nullable: true),
                    CreatedUserId = table.Column<string>(type: "TEXT", nullable: false),
                    ModifiedUserId = table.Column<string>(type: "TEXT", nullable: true),
                    IsActive = table.Column<int>(type: "INTEGER", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Loan", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "ContactDtoLoanDto",
                columns: table => new
                {
                    BorrowersId = table.Column<int>(type: "INTEGER", nullable: false),
                    LoansId = table.Column<int>(type: "INTEGER", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ContactDtoLoanDto", x => new { x.BorrowersId, x.LoansId });
                    table.ForeignKey(
                        name: "FK_ContactDtoLoanDto_Contact_BorrowersId",
                        column: x => x.BorrowersId,
                        principalTable: "Contact",
                        principalColumn: "ContactId",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_ContactDtoLoanDto_Loan_LoansId",
                        column: x => x.LoansId,
                        principalTable: "Loan",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.UpdateData(
                table: "Contact",
                keyColumn: "ContactId",
                keyValue: 1,
                column: "CreatedDate",
                value: "2022-12-09T16:38:54.5788810+10:00");

            migrationBuilder.CreateIndex(
                name: "IX_ContactDtoLoanDto_LoansId",
                table: "ContactDtoLoanDto",
                column: "LoansId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "ContactDtoLoanDto");

            migrationBuilder.DropTable(
                name: "Loan");

            migrationBuilder.UpdateData(
                table: "Contact",
                keyColumn: "ContactId",
                keyValue: 1,
                column: "CreatedDate",
                value: "2022-12-06T15:11:46.2593310+10:00");
        }
    }
}
