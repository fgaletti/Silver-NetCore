using System.Threading.Tasks;
using SilverApp.API.Models;

namespace SilverApp.API.Data
{
   public interface IAuthRepository
    {
         Task<User> Register(User user, string password);

         Task<User> Login(string username, string password);

        // Task<bool> UserExists(string username);
         Task<bool> UserExists(string username);

    }
}