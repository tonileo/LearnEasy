using Core.DTOs;
using Core.Entities;
using Core.Interfaces;
using Infrastructure.Data;
using Microsoft.EntityFrameworkCore;

namespace Infrastructure.Services;

public class FlashCardService(AppDbContext context) : IFlashCardService
{
    public async Task<FlashCardDto> GetFlashCard(int flashCardId)
    {
        var flashCards = await context.FlashCards
            .Include(x => x.Tag)
            .Where(x => x.Id == flashCardId)
            .AsNoTracking()
            .FirstOrDefaultAsync()
                ?? throw new ArgumentException("There is no flashCard with that id");

        var flashCard = new FlashCardDto()
        {
            Id = flashCards.Id,
            Question = flashCards.Question,
            Answer = flashCards.Answer,
            TagId = flashCards.TagId,
            TagName = flashCards.Tag?.Name
        };

        return flashCard;
    }

    public async Task<int> GetSubjectFlashCardsCount(int id)
    {
        var flashCards = await context.FlashCards.Where(x => x.SubjectId == id).AsNoTracking().ToListAsync();

        return flashCards.Count;
    }

    public async Task AddFlashCard(int subjectId, FlashCardRequestDto flashCardDto)
    {
        if (string.IsNullOrEmpty(flashCardDto.Question) || string.IsNullOrEmpty(flashCardDto.Answer))
        {
            throw new InvalidOperationException("Both answer and question has to be filled");
        }

        var flashCard = new FlashCard
        {
            Question = flashCardDto.Question,
            Answer = flashCardDto.Answer,
            TagId = flashCardDto.TagId,
            SubjectId = subjectId
        };

        await context.AddAsync(flashCard);
        await context.SaveChangesAsync();
    }

    public async Task EditFlashCard(int flashCardId, FlashCardRequestDto flashCardDto)
    {
        if (string.IsNullOrEmpty(flashCardDto.Question) || string.IsNullOrEmpty(flashCardDto.Answer))
        {
            throw new InvalidOperationException("Both answer and question has to be filled");
        }

        var flashCard = await context.FlashCards.Where(x => x.Id == flashCardId).FirstOrDefaultAsync();

        if (flashCard != null)
        {
            flashCard.Question = flashCardDto.Question;
            flashCard.Answer = flashCardDto.Answer;
            flashCard.TagId = flashCardDto.TagId;
        }

        await context.SaveChangesAsync();
    }

    public async Task DeleteFlashCard(int id)
    {
        var flashCard = await context.FlashCards.Where(x => x.Id == id).FirstOrDefaultAsync()
            ?? throw new InvalidOperationException("Flashcard with that id doesn't exists!");

        context.FlashCards.Remove(flashCard);
        await context.SaveChangesAsync();
    }

    public async Task<List<FlashCardDto>> GetRandomFlashCards(int subjectId)
    {
        var flashCards = await context.FlashCards
            .Where(x => x.SubjectId == subjectId)
            .AsNoTracking()
            .ToListAsync();

        var randomFlashCards = flashCards
            .OrderBy(_ => Guid.NewGuid())
            .Take(20)
            .ToList();

        var flashCardList = new List<FlashCardDto>();
        foreach (var flashCard in randomFlashCards)
        {
            flashCardList.Add(new FlashCardDto()
            {
                Id = flashCard.Id,
                Question = flashCard.Question,
                Answer = flashCard.Answer
            });
        }

        return flashCardList;
    }

    public async Task PatchLastReviewedFlashCard(List<FlashCardReviewedListDto> flashCardReviewedList)
    {

        if (flashCardReviewedList == null || !flashCardReviewedList.Any())
        {
            throw new InvalidOperationException("No flashcards to update");
        }

        foreach (var flashcardReview in flashCardReviewedList)
        {
            var flashCard = await context.FlashCards
            .Where(x => x.Id == flashcardReview.Id)
            .FirstOrDefaultAsync()
                ?? throw new InvalidOperationException($"Flashcard with ID {flashcardReview.Id} does not exist");

            flashCard.LastReviewed = DateTime.Now;
        }

        await context.SaveChangesAsync();
    }
}
