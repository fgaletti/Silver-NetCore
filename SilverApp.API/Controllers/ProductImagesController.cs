using System;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Mvc;
using SilverApp.API.Data;
using SilverApp.API.Models;

namespace SilverApp.API.Controllers
{
    [Route("api/productimages")]
    [ApiController]  
      public class ProductImagesController : ControllerBase
    {
        private IProductImageRepository _repo;

        public ProductImagesController(IHostingEnvironment environment, IProductImageRepository repo)
        {
             _repo = repo;
        }

        [HttpGet("{id}", Name = "GetImage")] 
        public async Task<IActionResult> GetImage(int id)
        {
           var imageFromRepo = await _repo.GetImage(id);   

           return Ok(imageFromRepo);
        }        

        [HttpPost("AddImageForProduct")]
        public async Task<IActionResult> AddImageForProduct ( 
            [FromBody] ProductImage productImage)
            {
                try {
                 var createdProduct = await  _repo.CreateProductImage(productImage);
                   return StatusCode(201) ; // status for createdRoute
                }
                catch(Exception ex)
                {
                    return BadRequest(ex.Message); 
                }
            }

        //   [HttpGet]
        [Route("/api/productimages")] 
         [AllowAnonymous] 
        public async Task<IActionResult> GetProductImages()
        {
            return Ok(await _repo.GetProductImages());
        }

         [Route("/api/productimages/list/{id}")] 
        [AllowAnonymous] 
        public async Task<IActionResult> GetProductImages(int id)
        {
            return Ok(await _repo.GetProductImages(id));
        }
    }
}