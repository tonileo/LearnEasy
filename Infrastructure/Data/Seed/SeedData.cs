using Core.Entities;

namespace Infrastructure.Data.Seed;

public class SeedData(AppDbContext context)
{
    public void Run()
    {
        if (!context.Categories.Any())
        {
            AddCategories(context);
        }
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
