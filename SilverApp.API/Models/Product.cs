using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace SilverApp.API.Models
{
    public class Product
    {
        [Key]
        public int Id { get; set; }
        public int categoryId { get; set; }

        [Required]
        [MaxLength(120)]
        public string name { get; set; }    
        
        [Required]
        [MaxLength(500)]
         public string description { get; set; }

        [Required]
        [MaxLength(200)]
        public string  shortDescription { get; set; }
        
        [Required]
        [MaxLength(30)]
        public string sku { get; set; }
        public byte isActive { get; set; }

        public byte isDownloadable { get; set; }
    
         [MaxLength(300)]

        public string image { get; set; }
        public byte manageStock { get; set; }
        public double quantity { get; set; }
        public decimal  price { get; set; }
        public string  urlImage { get; set; }

         public ICollection<ProductImage> ProductImages { get; set; }

    }
}