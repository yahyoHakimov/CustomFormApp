using CustomFormApp.Server.DbContext;
using CustomFormApp.Server.Interfaces.IRepository;
using CustomFormApp.Server.Interfaces.IServices;
using CustomFormApp.Server.Models;
using CustomFormApp.Server.Repository;
using CustomFormApp.Server.Services;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Protocols.OpenIdConnect;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

// Disable HTTPS redirection if in development
if (!builder.Environment.IsDevelopment())
{
    builder.Services.AddHttpsRedirection(options => options.HttpsPort = 443);
}
else
{
    builder.Services.AddHttpsRedirection(options => options.HttpsPort = null);
}

// Configure DbContext with PostgreSQL
builder.Services.AddDbContext<ApplicationDbContext>(options =>
    options.UseNpgsql(builder.Configuration.GetConnectionString("DefaultConnection")));

// Configure Identity
builder.Services.AddIdentity<ApplicationUser, IdentityRole>()
    .AddEntityFrameworkStores<ApplicationDbContext>()
    .AddDefaultTokenProviders();

// Dependency injection
builder.Services.AddScoped<IAdminService, AdminService>();
builder.Services.AddScoped<ITemplateService, TemplateService>();
builder.Services.AddScoped<ITemplateRepository, TemplateRepository>();
builder.Services.AddScoped<IFormService, FormService>();
builder.Services.AddScoped<IFormRepository, FormRepository>();

// Add HttpContextAccessor for accessing HTTP context
builder.Services.AddHttpContextAccessor();

// Configure Authentication
builder.Services.AddAuthentication();

// Configure CORS to allow all origins, methods, and headers
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowAll", policyBuilder =>
    {
        policyBuilder
            .AllowAnyOrigin()
            .AllowAnyMethod()
            .AllowAnyHeader();
    });
});

// Add AutoMapper with the current assembly
builder.Services.AddAutoMapper(typeof(Program));

var app = builder.Build();

// Use default files and serve static files
app.UseDefaultFiles();
app.UseStaticFiles();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseCors("AllowAll");

// Apply HTTPS redirection if not in development
if (!app.Environment.IsDevelopment())
{
    app.UseHttpsRedirection();
}

// Use authentication and authorization
app.UseAuthentication();
app.UseAuthorization();

// Map controllers
app.MapControllers();

// Fallback to `index.html` for SPA routing
app.MapFallbackToFile("/index.html");

app.Run();
