using System;

namespace SilverApp.API.Dtos
{
     public class UserForListDto
    {
        public int Id { get; set; }
        public string  Username { get; set; }
       
        public string FirstName { get; set; }
       
        public string  LastName { get; set; }
        public string  Email { get; set; }
        public byte isAdmin { get; set; }
        public DateTime LastActive { get; set; }

    }
}