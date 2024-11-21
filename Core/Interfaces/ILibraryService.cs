using Core.DTOs;

namespace Core.Interfaces;

public interface ILibraryService
{
    Task<List<LibraryDto>> GetAllSubjects();
    Task<List<CategoryDto>> GetAllCategories();
}
