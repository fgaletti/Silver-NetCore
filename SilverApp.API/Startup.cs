using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.HttpsPolicy;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;
using SilverApp.API.Data;
using Pomelo.EntityFrameworkCore.MySql.Infrastructure;
using Microsoft.EntityFrameworkCore;
using AutoMapper;
using System.Net;
using Microsoft.AspNetCore.Diagnostics;
using SilverApp.API.Helpers;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.FileProviders;
using System.IO;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;
using System.Text;
using Microsoft.AspNetCore.SpaServices.AngularCli;

namespace SilverApp.API
{
    public class  Startup 
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            services.AddDbContext<DataContext>(x => x.UseMySql(Configuration.GetConnectionString("MysqlConnection")));
            services.AddCors();

            services.AddAutoMapper();
            services.AddMvc().SetCompatibilityVersion(CompatibilityVersion.Version_2_1);
            services.AddScoped<IUserRepository, UserRepository>(); // Unable to resolve service for type &#x27;SilverApp.API.Data.IUserRepository
            services.AddScoped<IProductRepository, ProductRepository>(); // Unable to resolve service for type &#x27;SilverApp.API.Data.IUserRepository
            services.AddScoped<IProductImageRepository, ProductImageRepository>(); // Unable to resolve service for type &#x27;SilverApp.API.Data.IUserRepository
            services.AddScoped<IAuthRepository, AuthRepository>(); // Unable to resolve service for type &#x27;SilverApp.API.Data.IUserRepository

            services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme) // validation
            .AddJwtBearer(options =>{
                options.TokenValidationParameters = new TokenValidationParameters
                {
                    ValidateIssuerSigningKey = true,
                    IssuerSigningKey = new SymmetricSecurityKey(
                        Encoding.ASCII.GetBytes(Configuration.GetSection("AppSettings:Token").Value)),
                    ValidateIssuer = false,
                    ValidateAudience = false    
                };
            });

        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IHostingEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }
            else
            {
                 app.UseExceptionHandler(builder => {
                    builder.Run(async context => {
                        context.Response.StatusCode = (int) HttpStatusCode.InternalServerError;
                        var error = context.Features.Get<IExceptionHandlerFeature>();
                        if (error != null)
                        {
                            //Add helpers extension
                            context.Response.AddApplicationError(error.Error.Message);
                            await context.Response.WriteAsync(error.Error.Message);
                        }
                    });
                }
                );
                // app.UseHsts();
            }
             //app.UseCors( x => x.WithOrigins("http://localhost").AllowAnyOrigin().AllowAnyMethod().AllowAnyHeader().AllowCredentials());
             app.UseCors( x => x.AllowAnyOrigin().AllowAnyMethod().AllowAnyHeader());
           // app.UseHttpsRedirection();
            app.UseAuthentication();
            app.UseMvc();
            app.UseDefaultFiles(); // allows index.html
             app.UseStaticFiles(); // allows access images 
              app.UseDirectoryBrowser(new DirectoryBrowserOptions
                {
                    FileProvider = new PhysicalFileProvider(
                        Path.Combine(Directory.GetCurrentDirectory(), "wwwroot", "uploads")),
                    RequestPath = "/MyImages"
                });

            app.UseSpa(spa =>
            {
                // To learn more about options for serving an Angular SPA from ASP.NET Core,
                // see https://go.microsoft.com/fwlink/?linkid=864501

                spa.Options.SourcePath = "ClientApp";

                if (env.IsDevelopment())
                {
                    spa.UseAngularCliServer(npmScript: "start");
                    spa.Options.StartupTimeout = TimeSpan.FromSeconds(120); // Increase the timeout if angular app is taking longer to startup
                                                                            // spa.Options.StartupTimeout = new TimeSpan(0, 5, 0);
                                                                            // spa.UseProxyToSpaDevelopmentServer("http://localhost:4200"); // Use this instead to use the angular cli server
                }
            });



        }
    }
}
