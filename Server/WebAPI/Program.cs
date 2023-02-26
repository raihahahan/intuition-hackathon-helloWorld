using Data;
using MessageQueues.MessageProducer;
using Microsoft.EntityFrameworkCore;
using WebAPI.Services;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddCors(options =>
{
    options.AddPolicy(name: "CORS_spec",
                      builder =>
                      {
                          builder.WithOrigins("http://localhost:3000", "http://localhost:3001")
                            .AllowAnyMethod()
                            .AllowAnyHeader();
                      });
});

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

builder.Services.AddDbContext<DataDBContext>(options =>
    options.UseInMemoryDatabase("inMemoryDB"));
    //options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultDB")));

builder.Services.AddScoped<IUserInputService, UserInputService>();


//builder.Services.AddCors(options =>
//{
//    options.AddDefaultPolicy(
//        builder =>
//        {
//            builder.WithOrigins("http://host.docker.internal:3000/")
//                .AllowAnyHeader()
//                .AllowAnyMethod()
//                .AllowCredentials();
//        });
//});

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();
app.UseCors("CORS_spec");
app.UseAuthorization();

app.MapControllers();

app.Run();
