using Microsoft.EntityFrameworkCore;
using NewProject.Data;
using NewProject.Repository;
using System;

var builder = WebApplication.CreateBuilder(args);


var MyAllowSpecificOrigins = "_myAllowSpecificOrigins";




builder.Services.AddCors(options =>
{
    options.AddPolicy(name: MyAllowSpecificOrigins,
                      policy =>
                      {
                          policy.WithOrigins("http://localhost:3000/")
                                .AllowAnyHeader()
                                .AllowAnyMethod();
                               

                      });
});

// Add services to the container.

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

//định nghĩa dbcontext
builder.Services.AddDbContext<MyDbContext>(options =>
    options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection")));



//định nghĩa repository
builder.Services.AddScoped<ItacgiaRepository, TacgiaRepository>();
builder.Services.AddScoped<ITruyentranhRepository, TruyentranhRepository>();
builder.Services.AddScoped<ITheLoaiRepository, TheLoaiRepository>();
var app = builder.Build();

app.UseCors(MyAllowSpecificOrigins);



// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}


app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.Run();
