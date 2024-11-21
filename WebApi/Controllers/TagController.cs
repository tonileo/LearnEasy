using Core.DTOs;
using Core.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace WebApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TagController(ITagService tagService) : ControllerBase
    {
        [HttpGet]
        public async Task<ActionResult<IEnumerable<TagDto>>> GetTags()
        {
            var result = await tagService.GetTags();

            if (result == null) return BadRequest("Problem with fetching tags");

            return result;
        }

        [HttpPost]
        public async Task<ActionResult<TagDto>> CreateTag(string tagName)
        {
            var result = await tagService.CreateTag(tagName);

            if (result == null) return BadRequest("Problem with fetching tags");

            return Ok(result);
        }
    }
}
