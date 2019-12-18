using System.Threading.Tasks;
using SilverApp.API.Models;

namespace SilverApp.API.Data
{
    public interface IUserRepository
    {
        // Task<User> Register(User user, string password);
        Task<User> Register(User user, string password);
         Task<User> Login(string username, string password);

        Task<bool> UserExists(string username);

    }
}