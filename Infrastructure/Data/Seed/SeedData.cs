using Core.Entities;
using Microsoft.AspNetCore.Identity;

namespace Infrastructure.Data.Seed;

public class SeedData(AppDbContext context, UserManager<AppUser> userManager)
{
    public async Task Run()
    {
        if (!context.Users.Any())
        {
            await AddUsers(context);
        }

        if (!context.Categories.Any())
        {
            AddCategories(context);
        }
    }

    private async Task AddUsers(AppDbContext context)
    {
        var nonPremiumUser = new AppUser
        {
            FirstName = "Tom",
            LastName = "Jones",
            Email = "tom@jones.com",
            UserName = "tom@jones.com"
        };
        var nonPremiumUserPassword = "nonPremiumPa$$w0rd";

        var premiumUser = new AppUser
        {
            FirstName = "John",
            LastName = "Hose",
            Email = "john@hose.com",
            UserName = "john@hose.com",
            HasPremium = true,
        };
        var premiumUserPassword = "premiumPa$$w0rd";

        await userManager.CreateAsync(premiumUser, premiumUserPassword);
        await userManager.CreateAsync(nonPremiumUser, nonPremiumUserPassword);
    }

    private static void AddCategories(AppDbContext context)
    {
        context.Categories.AddRange(
            new Category() { Name = "Arts" },
            new Category() { Name = "Science" },
            new Category() { Name = "Mathematics" },
            new Category() { Name = "Literature" },
            new Category() { Name = "History" },
            new Category() { Name = "Philosophy" },
            new Category() { Name = "Music" },
            new Category() { Name = "Technology" },
            new Category() { Name = "Engineering" },
            new Category() { Name = "Social Sciences" },
            new Category() { Name = "Health & Medicine" },
            new Category() { Name = "Business" },
            new Category() { Name = "Law" },
            new Category() { Name = "Psychology" },
            new Category() { Name = "Education" },
            new Category() { Name = "Language & Linguistics" },
            new Category() { Name = "Environmental Studies" },
            new Category() { Name = "Political Science" },
            new Category() { Name = "Economics" },
            new Category() { Name = "Astronomy" },
            new Category() { Name = "Geography" },
            new Category() { Name = "Religious Studies" },
            new Category() { Name = "Sociology" },
            new Category() { Name = "Architecture" },
            new Category() { Name = "Cultural Studies" },
            new Category() { Name = "Other" }
        );

        context.SaveChanges();
    }
}
