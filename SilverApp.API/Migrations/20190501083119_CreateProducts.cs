using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;

namespace SilverApp.API.Migrations
{
    public partial class CreateProducts : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Products",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("MySql:ValueGenerationStrategy", MySqlValueGenerationStrategy.IdentityColumn),
                    name = table.Column<string>(maxLength: 120, nullable: false),
                    description = table.Column<string>(maxLength: 500, nullable: false),
                    shortDescription = table.Column<string>(maxLength: 200, nullable: false),
                    sku = table.Column<string>(maxLength: 30, nullable: false),
                    isActive = table.Column<byte>(nullable: false),
                    isDownloadable = table.Column<byte>(nullable: false),
                    image = table.Column<string>(nullable: true),
                    manageStock = table.Column<byte>(nullable: false),
                    quantity = table.Column<double>(nullable: false),
                    price = table.Column<decimal>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Products", x => x.Id);
                });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Products");
        }
    }
}
