using System.Collections.Generic;
using System.Threading.Tasks;
using SilverApp.API.Models;

namespace SilverApp.API.Data
{
    public interface IProductRepository
    {
         Task<Product> Create(Product product);
        Task<IEnumerable<Product>> GetProducts();
        
        Task<Product> GetProduct(int Id);

         Task<bool> SaveAll(); // images

         Task<int> GetSequenceNextVal(string nameSequence); // next value for the name of image

    }
}