using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;

namespace SilverApp.API.Models
{
    public class User
    {
        [Key]
        public int Id { get; set; }

        [Required]
        [MaxLength(100)]
        public string  Username { get; set; }
        [Required]
        [MaxLength(90)]
        public string FirstName { get; set; }
        [Required]
        [MaxLength(100)]
        public string  LastName { get; set; }
         public byte[] PasswordHash { get; set; }
        public byte[] PasswordSalt { get; set; }
        [Required]
        [MaxLength(100)]
        public string  Email { get; set; }
         public byte isAdmin { get; set; }
        public DateTime LastActive { get; set; }

    }

   
}