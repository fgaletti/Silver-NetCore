using System.ComponentModel.DataAnnotations;

namespace SilverApp.API.Models
{
    public class Category
    {
         [Key]
        public int Id { get; set; }
        [Required]
        [MaxLength(120)]
        public string name { get; set; }   
        public byte isActive { get; set; } 
    }
}