using Core.DTOs;
using Core.Entities;
using Core.Interfaces;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace WebApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class SubjectController(ISubjectService subjectService) : ControllerBase
    {
        [HttpGet]
        public async Task<ActionResult<IEnumerable<string>>> GetAllSubjects()
        {
            var result = await subjectService.GetAllSubjects();

            if (result == null) return BadRequest("Problem with fetching subjects");

            return result;
        }

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
            await subjectService.AddSubject(subjectRequestDto);

            return Ok();
        }
    }
}
