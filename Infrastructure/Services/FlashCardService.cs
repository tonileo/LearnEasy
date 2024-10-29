using System;
using Core.DTOs;
using Core.Entities;
using Core.Interfaces;
using Infrastructure.Data;
using Microsoft.EntityFrameworkCore;

namespace Infrastructure.Services;

public class FlashCardService(AppDbContext context) : IFlashCardService
{
    public async Task<List<FlashCardDto>> GetFlashCards(int subjectId)
    {
        try
        {
            var flashCards = await context.FlashCards
                .Where(x => x.SubjectId == subjectId)
                .AsNoTracking()
                .ToListAsync();

            var flashCardList = new List<FlashCardDto>();
            foreach (var flashCard in flashCards)
            {
                flashCardList.Add(new FlashCardDto()
                {
                    Question = flashCard.Question,
                    Answear = flashCard.Answear
                });
            }

            return flashCardList;
        }
        catch (Exception ex)
        {
            throw new InvalidOperationException("Problem with loading FlashCards: " + ex.Message);
        }
    }

    public async Task AddFlashCard(int subjectId, FlashCardDto flashCardDto)
    {
        try
        {
            if (string.IsNullOrEmpty(flashCardDto.Question) || string.IsNullOrEmpty(flashCardDto.Answear))
            {
                throw new InvalidOperationException("Both answear and question has to be filled");
            }

            var flashCard = new FlashCard
            {
                Question = flashCardDto.Question,
                Answear = flashCardDto.Answear,
                SubjectId = subjectId
            };

            await context.AddAsync(flashCard);
            await context.SaveChangesAsync();
        }
        catch (Exception ex)
        {
            throw new InvalidOperationException("Problem with adding the FlashCard: " + ex.Message);
        }
    }
}
