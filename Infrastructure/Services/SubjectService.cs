using System;
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
            .Include(z => z.Notes)
            .Include(g => g.PdfFiles)
            .SingleOrDefaultAsync(x => x.Id == id)
            ?? throw new InvalidOperationException($"No subject found with id {id}");

            var flashCardQuestion = subject.FlashCards.Select(f => f.Question).Take(8).ToList<string?>();
            var noteNames = subject.Notes.Select(x => x.Name).ToList();
            var pdfFileNames = subject.PdfFiles.Select(g => g.Name).ToList<string?>();

            return new SubjectDto
            {
                Name = subject.Name,
                FlashCardQuestions = flashCardQuestion,
                NoteNames = noteNames,
                PdfFileNames = pdfFileNames,

                FlashCardsCount = flashCardQuestion.Count,
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
}
