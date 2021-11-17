using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.OpenApi.Models;
using StudyProgramms.Data;
using StudyProgramms.Data.Interfaces;
using StudyProgramms.Data.Repositories;

namespace StudyProgramms.Web
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
                app.UseSwagger();
                app.UseSwaggerUI(c => c.SwaggerEndpoint("/swagger/v1/swagger.json", "StudyPrograms.Web v1"));
            }

            app.UseRouting();

            app.UseAuthorization();
            app.UseCors(builder => 
            {
                builder.AllowAnyOrigin();
                builder.AllowAnyHeader();
            });

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllers();
            });
        }


        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            services.AddControllers();
            services.AddCors();
            services.AddSwaggerGen(c =>
            {
                c.SwaggerDoc("v1", new OpenApiInfo { Title = "StudyPrograms.Web", Version = "v1" });
            });

            RegistreServices(services);
        }

        private void RegistreServices(IServiceCollection services)
        {
            services.AddSingleton(new MongoDbContext(Configuration.GetConnectionString("MongoDb")));
            services.AddScoped(typeof(IRepository<>), typeof(Repository<>));
        }
    }
}
