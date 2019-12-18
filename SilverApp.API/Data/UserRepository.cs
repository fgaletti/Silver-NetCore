using System.Threading.Tasks;
using SilverApp.API.Models;
using System.Linq; // TO AVOID --> DBSet does not contain a definition for Where [duplicate]
using Microsoft.EntityFrameworkCore; /* FirstOrDefaultAsync -- DBSet does not contain a definition for Where [duplicate] */

namespace SilverApp.API.Data
{
    public class UserRepository : IUserRepository
    {
        private readonly DataContext _context;

        public UserRepository(DataContext context)
        {
            _context = context;
        }

        

        public async Task<User> Register(User user, string password)
        {
            byte[] passWordHash, passSalt;

            CreatePasswordHash(password , out passWordHash, out passSalt);
            user.PasswordHash = passWordHash;
            user.PasswordSalt = passSalt;
            await _context.Users.AddAsync(user); // need to add await
            await _context.SaveChangesAsync(); // need to add await
            return user;
        }

         public async Task<User> Login(string username, string password)
        {
            // check if user exists
            var user = await _context.Users.FirstOrDefaultAsync(x => x.Username == username);

            if (user == null)
               return null;

            if (!VerifyPasswordHash(password, user.PasswordHash, user.PasswordSalt))
              return null;   

            return user;
        }

           private bool VerifyPasswordHash(string password, byte[] passwordHash, byte[] passwordSalt)
        {
            using (var hmac = new System.Security.Cryptography.HMACSHA512(passwordSalt))
            {
                var ComputedHash = hmac.ComputeHash(System.Text.Encoding.UTF8.GetBytes(password));
                for (int i =0; i <ComputedHash.Length; i++)
                {
                    if (ComputedHash[i] != passwordHash[i]) return false;
                }
            }
            return true;
        } 

         private void CreatePasswordHash(string password, out byte[] passWordHash, out byte[] passSalt)
        {
            using (var hmac = new System.Security.Cryptography.HMACSHA512())
            {
                passSalt = hmac.Key;
                passWordHash = hmac.ComputeHash(System.Text.Encoding.UTF8.GetBytes(password));
            }
        }

           public async Task<bool> UserExists(string username)
        {
            // if user exists 
            if (await _context.Users.AnyAsync(x => x.Username == username) )
                 return true;

            return false;     
        }
    }
}