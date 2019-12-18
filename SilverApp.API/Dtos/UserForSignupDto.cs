using System.ComponentModel.DataAnnotations;

namespace SilverApp.API.Dtos
{
    public class UserForRegisterDto
    {        
        public string  Username { get; set; }
        [Required]
        [MaxLength(90)]
        public string FirstName { get; set; }
        [Required]
        [MaxLength(100)]
        public string  LastName { get; set; }
          
        [StringLength(8, MinimumLength=4, ErrorMessage="you must specify a password bettween 4 and 8 characteres")]
        public string  Password { get; set; }

        [Required]
        [MaxLength(100)]
        public string  Email { get; set; }
    }
}