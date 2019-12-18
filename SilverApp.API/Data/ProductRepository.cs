using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using SilverApp.API.Models;
using System.Linq;

namespace SilverApp.API.Data
{
    public class ProductRepository : IProductRepository
    {
         private readonly DataContext _context;

        public ProductRepository(DataContext context)
        {
            _context = context;
        }
        public async Task<Product> Create(Product product)
        {   
            await _context.Products.AddAsync(product); 
            await _context.SaveChangesAsync(); 
            return product;
        }

        public async Task<Product> GetProduct(int Id)
        {
            return await _context.Products.FirstOrDefaultAsync(p => p.Id == Id);
        }

        public async Task<IEnumerable<Product>> GetProducts()
        {
            // in order to add Include we need to add : Microsoft.EntityFrameworkCore
            return await _context.Products.OrderByDescending(p => p.categoryId).ToListAsync();
        }

        public async Task<bool> SaveAll()
        {
            return await _context.SaveChangesAsync() > 0;
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