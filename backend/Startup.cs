using System.Net.Sockets;
using JsonApiDotNetCore.Configuration;
using Microsoft.EntityFrameworkCore;
using Microsoft.OpenApi.Models;
using SampleWeb.DataAccess;

namespace SampleWeb;

class Startup
{
    public Startup(IConfiguration configuration, IWebHostEnvironment environment)
    {
        Configuration = configuration;
        Environment = environment;
    }

    private IConfiguration Configuration { get; }
    private IWebHostEnvironment Environment { get; }

    // This method gets called by the runtime. Use this method to add services to the container.
    public void ConfigureServices(IServiceCollection services)
    {
        services.AddDbContext<MyCrmDbContext>(options =>
            options
                .UseSqlite("Data Source=Database.db",
                    sqliteOptions => sqliteOptions.UseQuerySplittingBehavior(QuerySplittingBehavior.SplitQuery))
                .EnableSensitiveDataLogging()
                .EnableDetailedErrors());

        services.AddAuthentication();

        services.AddAuthorization();

        services.AddJsonApi(discovery: discovery => discovery.AddCurrentAssembly());
        
        services.AddHealthChecks();

        services.AddMvc();
        
        services.AddSwaggerGen(c =>
        {
            c.SwaggerDoc("v1", new OpenApiInfo { Title = "My API", Version = "v1" });                
        });

        services.AddCors();
        
        // services.AddSwaggerGen(genOptions =>
        // {
        //     genOptions.OperationFilter<JsonApiOperationFilter>();
        //     genOptions.SchemaFilter<JsonApiSchemaFilter>();
        //     genOptions.ParameterFilter<JsonApiParameterFilter>();
        //     genOptions.DocumentFilter<JsonApiDocumentFilter>();
        // });
        
        Environment.ContentRootPath =
            Path.GetFullPath(Path.Combine(typeof(Startup).Assembly.Location, "../../../frontend"));

    }

    // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
    public void Configure(IApplicationBuilder app, IHostApplicationLifetime appLifetime)
    {
        if (Environment.IsDevelopment())
        {
            app.UseDeveloperExceptionPage();
            // IdentityModelEventSource.ShowPII = true; 
        }
        
        app.UseRouting();

        if (Configuration.GetValue<bool?>("enableCors") ?? false)
        {
            app.UseCors(options => options.AllowAnyOrigin().AllowAnyHeader().AllowAnyMethod());
        }

        app.UseAuthentication();
        app.UseAuthorization();

        app.UseJsonApi();

        app.UseStaticFiles();

        app.UseSwagger();

        app.UseSwaggerUI();
        
        app.UseEndpoints(endpoints =>
        {
            endpoints.MapSwagger();
            
            endpoints.MapHealthChecks("/ping");
            
            // Important: Don't specify RequireAuthorization() here because:
            // 1. It invokes the DefaultPolicy and we are explicitly NOT setting that because it
            //    authorizes ALL authenticated users regardless of authentication scheme and requirements.
            // 2. We instead use a FallbackPolicy to add authorization to any controller
            //    that doesn't explicitly set the Authorize attribute.
            endpoints.MapControllers();
        });
    }
}