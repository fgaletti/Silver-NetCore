using System.Collections.Generic;
using System.Threading.Tasks;
using AutoMapper.Configuration;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using SilverApp.API.Data;
using SilverApp.API.Models;

namespace SilverApp.API.Controllers
{
    [Route("api/[controller]")]
    public class CategoriesController : ControllerBase
    {
         private readonly DataContext _context;
        public CategoriesController( DataContext context)
        {
            _context = context;
        }

        public async Task<IEnumerable<Category>> GetCategories()
        {
            // in order to add Include we need to add : Microsoft.EntityFrameworkCore
            return await _context.Categories.ToListAsync();
        }

    }
}