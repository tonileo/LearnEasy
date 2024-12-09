using Core.DTOs;
using Core.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using WebApi.Extensions;

namespace WebApi.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class SubjectController(ISubjectService subjectService) : ControllerBase
    {
        [HttpGet("{id}")]
        public async Task<ActionResult<SubjectDto>> GetSubject(int id)
        {
            var result = await subjectService.GetSubject(id);

            if (result == null) return BadRequest("Problem with fetching subject");

            return result;
        }

        [HttpPost]
        public async Task<ActionResult> AddSubject(SubjectRequestDto subjectRequestDto)
        {
            var userId = User.GetId();

            await subjectService.AddSubject(subjectRequestDto, userId);

            return Ok();
        }

        [HttpPut("{subjectId}")]
        public async Task<ActionResult> EditSubject(int subjectId, SubjectRequestDto subjectRequestDto)
        {
            var userId = User.GetId();

            await subjectService.EditSubject(subjectId, userId, subjectRequestDto);

            return Ok();
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult> DeleteSubject(int id)
        {
            await subjectService.DeleteSubject(id);

            return Ok();
        }
    }
}
