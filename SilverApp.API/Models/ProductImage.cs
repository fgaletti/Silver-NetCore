using System.ComponentModel.DataAnnotations;

namespace SilverApp.API.Models
{
    public class ProductImage
    {
         [Key]
        public int Id { get; set; }
        public int ProductId { get; set; }  
        public string description { get; set; }
        public string  urlImage { get; set; }
        public Product product { get; set; }
    }
}