using Core.DTOs;
using Core.Entities;
using Core.Interfaces;
using Infrastructure.Data;
using Microsoft.EntityFrameworkCore;

namespace Infrastructure.Services;

public class SubjectService(AppDbContext context) : ISubjectService
{
    public async Task<SubjectDto> GetSubject(int id)
    {
        try
        {
            var subject = await context.Subjects
            .Include(f => f.FlashCards)
            .ThenInclude(f => f.Tag)
            .Include(z => z.Notes)
            .Include(g => g.PdfFiles)
            .AsNoTracking()
            .SingleOrDefaultAsync(x => x.Id == id)
            ?? throw new InvalidOperationException($"No subject found with id {id}");

            var flashCards = subject.FlashCards.Take(8);
            var noteNames = subject.Notes.Select(x => x.Name).ToList();
            var pdfFileNames = subject.PdfFiles.Select(g => g.Name).ToList<string?>();
            var flashCardCount = subject.FlashCards.Count;

            var smallFlashCardsList = new List<SmallFlashCardDto?>();
            foreach (var flashCard in flashCards)
            {
                SmallFlashCardDto smallFlashCards = new SmallFlashCardDto
                {
                    Id = flashCard.Id,
                    Question = flashCard.Question,
                    TagName = flashCard.Tag?.Name
                };

                smallFlashCardsList.Add(smallFlashCards);
            }

            return new SubjectDto
            {
                Name = subject.Name,
                FlashCards = smallFlashCardsList,
                NoteNames = noteNames,
                PdfFileNames = pdfFileNames,

                FlashCardsCount = flashCardCount,
                PdfFilesCount = pdfFileNames.Count,
                NotesCount = noteNames.Count,
            };
        }
        catch (Exception ex)
        {
            throw new InvalidOperationException("Problem with loading the subject: " + ex.Message);
        }
    }

    public async Task AddSubject(SubjectRequestDto subjectRequestDto)
    {
        if (subjectRequestDto.Color != "blue" && subjectRequestDto.Color != "red" && subjectRequestDto.Color != "purple"
            && subjectRequestDto.Color != "green" && subjectRequestDto.Color != "orange" && subjectRequestDto.Color != "yellow"
            && subjectRequestDto.Color != "lightblue")
        {
            throw new InvalidOperationException("Color picked is not allowed!");
        }

        try
        {
            var subjectNames = await context.Subjects.Where(x => x.Name == subjectRequestDto.Name).FirstOrDefaultAsync();

            if (subjectNames != null)
            {
                throw new InvalidOperationException("Subject with that name already exists!");
            }

            var addSubject = new Subject
            {
                Name = subjectRequestDto.Name,
                CategoryId = subjectRequestDto.CategoryId,
                Color = subjectRequestDto.Color
            };

            await context.AddAsync(addSubject);
            await context.SaveChangesAsync();
        }
        catch (Exception ex)
        {
            throw new InvalidOperationException("Problem with adding the subject! " + ex.Message);
        }
    }

    public async Task EditSubject(int subjectId, SubjectRequestDto subjectRequestDto)
    {
        if (subjectRequestDto.Color != "blue" && subjectRequestDto.Color != "red" && subjectRequestDto.Color != "purple"
            && subjectRequestDto.Color != "green" && subjectRequestDto.Color != "orange" && subjectRequestDto.Color != "yellow"
            && subjectRequestDto.Color != "lightblue")
        {
            throw new InvalidOperationException("Color picked is not allowed!");
        }

        try
        {
            var subjectNames = await context.Subjects.Where(x => x.Name == subjectRequestDto.Name).FirstOrDefaultAsync();

            if (subjectNames != null)
            {
                throw new InvalidOperationException("Subject with that name already exists!");
            }

            var subject = await context.Subjects.Where(y => y.Id == subjectId).FirstOrDefaultAsync();

            if (subject != null)
            {
                subject.Name = subjectRequestDto.Name;
                subject.CategoryId = subjectRequestDto.CategoryId;
                subject.Color = subjectRequestDto.Color;
            }

            await context.SaveChangesAsync();
        }
        catch (Exception ex)
        {
            throw new InvalidOperationException("Problem with editing the subject! " + ex.Message);
        }
    }

    public async Task DeleteSubject(int id)
    {
        try
        {
            var subject = await context.Subjects.Where(x => x.Id == id).FirstOrDefaultAsync() 
                ?? throw new InvalidOperationException("Subject with that id doesn't exists!");

            context.Subjects.Remove(subject);
            await context.SaveChangesAsync();
        }
        catch (Exception ex)
        {
            throw new InvalidOperationException("Problem with deleting the subject! " + ex.Message);
        }
    }
}
