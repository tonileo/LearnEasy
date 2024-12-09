using Core.DTOs;
using Core.Interfaces;
using Infrastructure.Data;
using Microsoft.EntityFrameworkCore;

namespace Infrastructure.Services;

public class LibraryService(AppDbContext context) : ILibraryService
{
    public async Task<List<LibraryDto>> GetAllSubjects(string userId)
    {
        var subjects = await context.Subjects
            .Where(u => u.UserId == userId)
            .Include(s => s.Category)
            .Include(f => f.FlashCards)
            .Include(n => n.Notes)
            .Include(p => p.PdfFiles)
            .AsNoTracking()
            .ToListAsync();

        var flashCardCount = subjects.Sum(c => c.Notes.Count);

        var subjectList = new List<LibraryDto>();
        foreach (var subject in subjects)
        {
            var library = new LibraryDto
            {
                SubjectId = subject.Id,
                Name = subject.Name,
                Color = subject.Color,
                CategoryName = subject.Category!.Name,

                FlashCardsCount = subject.FlashCards.Count,
                NotesCount = subject.Notes.Count,
                PdfFilesCount = subject.PdfFiles.Count
            };

            subjectList.Add(library);
        }

        return subjectList;
    }

    public async Task<List<CategoryDto>> GetAllCategories()
    {
        var categories = await context.Categories.OrderBy(x => x.Id).AsNoTracking().ToListAsync();

        var categoryList = new List<CategoryDto>();
        foreach (var category in categories)
        {
            var categoryDto = new CategoryDto
            {
                Id = category.Id,
                Name = category.Name
            };

            categoryList.Add(categoryDto);
        }

        return categoryList;
    }
}
