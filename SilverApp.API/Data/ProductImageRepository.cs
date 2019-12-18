using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using SilverApp.API.Models;

namespace SilverApp.API.Data
{
    public class ProductImageRepository : IProductImageRepository
    {
        private readonly DataContext _context;
        
         public ProductImageRepository(DataContext context)
        {
            _context = context;
        }
        public async  Task<ProductImage> CreateProductImage(ProductImage productImage)
        {   
            await _context.Productimages.AddAsync(productImage); 
            await _context.SaveChangesAsync();
            return productImage;
        }

         public async Task<ProductImage> GetImage(int id)
        {
            var image = await _context.Productimages.FirstOrDefaultAsync(p => p.Id == id);
            return image;
        }

        public async Task<IEnumerable<ProductImage>> GetProductImages()
        {
            return await _context.Productimages.ToListAsync();
        }

         public async Task<IEnumerable<ProductImage>> GetProductImages(int id)
        {
           // in order to add Include we need to add : Microsoft.EntityFrameworkCore
            return await _context.Productimages.Where(p => p.ProductId == id).ToListAsync();
        }


         public async Task<int> GetSequenceNextVal(string nameSequence)
        {
            var image = await _context.Sequences.Where(x => x.name == nameSequence).ToListAsync();      
            var currentValue = image[0].value;
            image[0].value = image[0].value + 1;   
            await _context.SaveChangesAsync();  
            return currentValue;
        }       
    }
}