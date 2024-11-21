using Core.DTOs;
using Core.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace WebApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class LibraryController(ILibraryService libraryService) : ControllerBase
    {
        [HttpGet]
        public async Task<ActionResult<IEnumerable<LibraryDto>>> GetAllSubjects()
        {
            var result = await libraryService.GetAllSubjects();

            if (result == null) return BadRequest("Problem with fetching subjects");

            return result;
        }

        [HttpGet("categories")]
        public async Task<ActionResult<IEnumerable<CategoryDto>>> GetAllCategories()
        {
            var result = await libraryService.GetAllCategories();

            if (result == null) return BadRequest("Problem with fetching categories");

            return result;
        }
    }
}
