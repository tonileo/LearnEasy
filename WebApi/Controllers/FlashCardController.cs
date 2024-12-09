using Core.DTOs;
using Core.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace WebApi.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class FlashCardController(IFlashCardService flashCardService) : ControllerBase
    {
        [HttpGet("{flashCardId}")]
        public async Task<ActionResult<FlashCardDto>> GetFlashCard(int flashCardId)
        {
            var result = await flashCardService.GetFlashCard(flashCardId);

            if (result == null) return BadRequest("Problem with fetching the flashcard");

            return result;
        }

        [HttpGet("subject/{id}")]
        public async Task<ActionResult<int>> GetSubjectFlashCardsCount(int id)
        {
            var result = await flashCardService.GetSubjectFlashCardsCount(id);

            return result;
        }

        [HttpPost]
        public async Task<ActionResult> AddFlashCard(int subjectId, FlashCardRequestDto flashCardDto)
        {
            await flashCardService.AddFlashCard(subjectId, flashCardDto);

            return Ok();
        }

        [HttpPut]
        public async Task<ActionResult> EditFlashCard(int flashCardId, FlashCardRequestDto flashCardDto)
        {
            await flashCardService.EditFlashCard(flashCardId, flashCardDto);

            return Ok();
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult> DeleteFlashCard(int id)
        {
            await flashCardService.DeleteFlashCard(id);

            return Ok();
        }

        [HttpGet("learn/{subjectId}")]
        public async Task<ActionResult<IEnumerable<FlashCardDto>>> GetRandomFlashCards(int subjectId)
        {
            var result = await flashCardService.GetRandomFlashCards(subjectId);

            if (result == null) return BadRequest("Problem with fetching flashcards");

            return result;
        }

        [HttpPatch("learn")]
        public async Task<ActionResult> PatchLastReviewedFlashCard(List<FlashCardReviewedListDto> flashCardReviewedList)
        {
            await flashCardService.PatchLastReviewedFlashCard(flashCardReviewedList);

            return Ok();
        }
    }
}
