using System.Reflection;
using Core.Entities;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace Infrastructure.Data;

public class AppDbContext(DbContextOptions options) : IdentityDbContext<AppUser>(options)
{
    public DbSet<Subject> Subjects { get; set; }
    public DbSet<FlashCard> FlashCards { get; set; }
    public DbSet<Category> Categories { get; set; }
    public DbSet<Note> Notes { get; set; }
    public DbSet<PdfFile> PdfFiles { get; set; }
    public DbSet<Tag> Tags { get; set; }
    public DbSet<Order> Orders { get; set; }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);
        modelBuilder.ApplyConfigurationsFromAssembly(Assembly.GetExecutingAssembly());
    }
}
