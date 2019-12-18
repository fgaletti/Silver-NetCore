using System.ComponentModel.DataAnnotations;

namespace SilverApp.API.Models
{
    public class Sequence
    {
         [Key]
        public int Id { get; set; }
         [Required]
        [MaxLength(50)]
        public string name { get; set; }  
        
         [Required]
        public int value { get; set; }

    }
}