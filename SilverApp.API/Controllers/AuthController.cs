using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using SilverApp.API.Data;
using SilverApp.API.Dtos;
using SilverApp.API.Models;


[Route("api/[controller]")]
[ApiController]
public class AuthController : ControllerBase
{
    private readonly IAuthRepository _repo;
    private readonly IMapper _mapper;

    public IConfiguration _config { get; }

    public AuthController(IAuthRepository repo, IConfiguration config,
        IMapper mapper)
    {
        _repo = repo;
        _config = config;
        _mapper = mapper;
    }

    [HttpPost("register")]
    //public async Task<IActionResult> Signup([FromBody]UserForRegisterDto  userForRegisterDto) 
    public async Task<IActionResult> Register([FromBody]UserForRegisterDto userForRegisterDto)
    {
        // username equal to first Email that the user 
        userForRegisterDto.Username = userForRegisterDto.Email.ToLower();
        userForRegisterDto.Email = userForRegisterDto.Email.ToLower();

        if (await _repo.UserExists(userForRegisterDto.Username.ToLower()))
            return BadRequest("user already exists");



        var userToCreate = _mapper.Map<User>(userForRegisterDto);


        var createdUser = await _repo.Register(userToCreate, userForRegisterDto.Password);
        return StatusCode(201); // status for createdRoute
                                // return CreatedAtRoute("GetUser", new {controller = "Users", id = createdUser.Id}, userToReturn);

    }

    [HttpPost("login")]
    public async Task<IActionResult> Login([FromBody]UserForLoginDto userForLoginDto)
    {
        var userFromRepo = await _repo.Login(userForLoginDto.email.ToLower(), userForLoginDto.Password);

        if (userFromRepo == null)
            return Unauthorized();

        //create token
        var claims = new[]
        {
                    new Claim(ClaimTypes.NameIdentifier, userFromRepo.Id.ToString()),
                    new Claim(ClaimTypes.Name, userFromRepo.Username)
                };

        // add tokens
        // config.GetSection("Appsettings:Token") => appsettings.json
        var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_config.GetSection("Appsettings:Token").Value));
        var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha512Signature);

        var tokenDescriptor = new SecurityTokenDescriptor
        {
            Subject = new ClaimsIdentity(claims),
            Expires = DateTime.Now.AddDays(1),
            SigningCredentials = creds
        };

        var tokenHandler = new JwtSecurityTokenHandler();
        var token = tokenHandler.CreateToken(tokenDescriptor);

        //   we dont want to use userFromRepo because has passwords so
        // we use UserForListDto instead
        var user = _mapper.Map<UserForListDto>(userFromRepo);
        //var user = _mapper.Map<UserForListDto>(_repo.GetUser(userFromRepo.Id);
        // var user = await _repo.GetUser(id);

        // return 2 objects that are going to be stored in the browser
        // localStorage --> token - user 
        return Ok(
            new
            {
                token = tokenHandler.WriteToken(token),
                user //  add new parameter
                    }
        );
    }

}