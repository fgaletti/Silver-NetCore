using AutoMapper;
using SilverApp.API.Models;
using SilverApp.API.Dtos;

namespace SilverApp.API.Helpers
{
    public class AutoMapperProfiles : Profile
    {
       public AutoMapperProfiles()
       {
            CreateMap<UserForRegisterDto, User>(); 
            CreateMap<UserForLoginDto, User>(); 

       }

    }
}