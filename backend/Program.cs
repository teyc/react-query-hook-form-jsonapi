using SampleWeb;

var builder = WebApplication.CreateBuilder(args);
builder.Host.UseDefaultServiceProvider(options =>
{
    // This speeds up startup significantly. Instead of validating
    // each startup, we validate during a test.
    options.ValidateScopes = false;
    options.ValidateOnBuild = false;
});

// UseStartup() is not supported by WebApplicationBuilder.WebHost
// So we just call it manually to keep changes minimal for now.
var startup = new Startup(builder.Configuration, builder.Environment);
startup.ConfigureServices(builder.Services);

var app = builder.Build();
startup.Configure(app, app.Lifetime);

app.Run();
