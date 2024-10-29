using Core.DTOs;
using Core.Interfaces;
using Infrastructure.Services;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace WebApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class FlashCardController(IFlashCardService flashCardService) : ControllerBase
    {
        [HttpGet("{subjectId}")]
        public async Task<ActionResult<IEnumerable<FlashCardDto>>> GetFlashCards(int subjectId)
        {
            var result = await flashCardService.GetFlashCards(subjectId);

            if (result == null) return BadRequest("Problem with fetching subject");

            return result;
        }

        [HttpPost]
        public async Task<ActionResult> AddFlashCard(int subjectId, FlashCardDto flashCardDto)
        {
            await flashCardService.AddFlashCard(subjectId, flashCardDto);

            return Ok();
        }
    }
}
