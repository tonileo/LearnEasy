using Core.DTOs;

namespace Core.Interfaces;

public interface IFlashCardService
{
    Task<List<FlashCardDto>> GetFlashCards(int subjectId);
    Task<FlashCardDto> GetFlashCard(int flashCardId);
    Task AddFlashCard(int subjectId, FlashCardRequestDto flashCardDto);
    Task EditFlashCard(int flashCardId, FlashCardRequestDto flashCardDto);
    Task DeleteFlashCard(int id);
    Task<List<FlashCardDto>> GetRandomFlashCards(int subjectId);
    Task PatchLastReviewedFlashCard(List<FlashCardReviewedListDto> flashCardReviewedList);
}
