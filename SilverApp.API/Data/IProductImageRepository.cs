using System.Collections.Generic;
using System.Threading.Tasks;
using SilverApp.API.Models;

namespace SilverApp.API.Data
{
    public interface IProductImageRepository
    {
      Task<ProductImage> CreateProductImage(ProductImage productImage);

        Task<IEnumerable<ProductImage>> GetProductImages();
        Task<IEnumerable<ProductImage>> GetProductImages(int id);
         Task<ProductImage> GetImage(int id);

         Task<int> GetSequenceNextVal(string nameSequence); // next value for the name of image
    }
}