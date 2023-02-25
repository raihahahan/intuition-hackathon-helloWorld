using Data.Models;
using Microsoft.EntityFrameworkCore;
using static Microsoft.EntityFrameworkCore.DbLoggerCategory.Database;

namespace Data
{
    public class DataDBContext : DbContext
    {
        public DataDBContext(DbContextOptions<DataDBContext> options) : base(options)
        { }

        public DbSet<UserInput> UserInputs { get; set; }
        public DbSet<UserInputResult> UserInputsResult { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<UserInputResult>()
                .HasOne(ui => ui.UserInput)
                .WithOne();

            modelBuilder.Entity<UserInputResult>()
                .HasMany(ui => ui.KeywordToCount)
                .WithOne()
                .HasForeignKey(ui => ui.UserInputResultId);
        }

    }
}