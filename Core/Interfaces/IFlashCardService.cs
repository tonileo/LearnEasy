using Core.DTOs;

namespace Core.Interfaces;

public interface IFlashCardService
{
    Task<FlashCardDto> GetFlashCard(int flashCardId);
    Task<int> GetSubjectFlashCardsCount(int id);
    Task AddFlashCard(int subjectId, FlashCardRequestDto flashCardDto);
    Task EditFlashCard(int flashCardId, FlashCardRequestDto flashCardDto);
    Task DeleteFlashCard(int id);
    Task<List<FlashCardDto>> GetRandomFlashCards(int subjectId);
    Task PatchLastReviewedFlashCard(List<FlashCardReviewedListDto> flashCardReviewedList);
}
