using Microsoft.EntityFrameworkCore.Migrations;

namespace SilverApp.API.Migrations
{
    public partial class ProductImages2 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Productimages_Products_productId",
                table: "Productimages");

            migrationBuilder.DropColumn(
                name: "idProduct",
                table: "Productimages");

            migrationBuilder.RenameColumn(
                name: "productId",
                table: "Productimages",
                newName: "ProductId");

            migrationBuilder.RenameIndex(
                name: "IX_Productimages_productId",
                table: "Productimages",
                newName: "IX_Productimages_ProductId");

            migrationBuilder.AlterColumn<int>(
                name: "ProductId",
                table: "Productimages",
                nullable: false,
                oldClrType: typeof(int),
                oldNullable: true);

            migrationBuilder.AddForeignKey(
                name: "FK_Productimages_Products_ProductId",
                table: "Productimages",
                column: "ProductId",
                principalTable: "Products",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Productimages_Products_ProductId",
                table: "Productimages");

            migrationBuilder.RenameColumn(
                name: "ProductId",
                table: "Productimages",
                newName: "productId");

            migrationBuilder.RenameIndex(
                name: "IX_Productimages_ProductId",
                table: "Productimages",
                newName: "IX_Productimages_productId");

            migrationBuilder.AlterColumn<int>(
                name: "productId",
                table: "Productimages",
                nullable: true,
                oldClrType: typeof(int));

            migrationBuilder.AddColumn<int>(
                name: "idProduct",
                table: "Productimages",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddForeignKey(
                name: "FK_Productimages_Products_productId",
                table: "Productimages",
                column: "productId",
                principalTable: "Products",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }
    }
}
