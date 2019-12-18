using System;
using System.IO;
using System.Threading.Tasks;
using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Http.Features;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Filters;
using Microsoft.Extensions.Configuration;
using SilverApp.API.Data;
using SilverApp.API.Models;

namespace SilverApp.API.Controllers
{
    [Authorize]
     [Route("api/[controller]")]
    public class ProductsController : ControllerBase
    {

         private readonly IProductRepository _repo;
         private readonly IMapper _mapper;
         public IConfiguration _config { get; }

         private IHostingEnvironment _hostingEnvironment;
        
          public ProductsController(IHostingEnvironment environment, IProductRepository repo, IMapper mapper, IConfiguration config)
        {
            _repo = repo;
            _mapper = mapper;
            _config = config; // get the token
            _hostingEnvironment = environment;
        }

        [HttpPost("Create")]
         public async Task<IActionResult> Create ([FromBody]Product product)
         {
             
             try {
                 var createdProduct = await  _repo.Create(product);
                   return StatusCode(201) ;
             }
             catch(Exception ex)
             {
                 return BadRequest(ex.Message); 
             }
         }



         [AllowAnonymous] 
         [Route("/api/products")] 
        public async Task<IActionResult> GetProducts()
        {
            return Ok(await _repo.GetProducts());
        }

        [AllowAnonymous] 
        [HttpGet("{id}", Name = "GetProduct")]
         
        public async Task<IActionResult> GetProduct(int id)
        {
            var product = await _repo.GetProduct(id);
            return Ok(product);
        }
         
         [Route("/api/GetSequenceNextVal")] 
        public async Task<IActionResult> GetSequenceNextVal(int id)
        {
           var sequenceValue = await _repo.GetSequenceNextVal("productimage");   

           return Ok(sequenceValue);
        }

        [HttpPost("AddImageProduct")]
        public async Task<IActionResult> AddImageProduct ( string sesionId ,
            [FromForm]IFormFile file)
            {
                // get next id image
                var sequenceValue = await _repo.GetSequenceNextVal("productimage");   

                // string sesionId 

                var uploads = Path.Combine(_hostingEnvironment.WebRootPath, "uploads");
                if (file.Length > 0) {
                    var filePath = Path.Combine(uploads, sequenceValue.ToString() + "_" + file.FileName );
                    using (var fileStream = new FileStream(filePath, FileMode.Create)) {
                        await file.CopyToAsync(fileStream);
                    }
                }
                string imageName = Request.Host.Value + "/uploads/" + sequenceValue.ToString() + "_" + file.FileName;

                return Ok(imageName) ;
            }


    }
}