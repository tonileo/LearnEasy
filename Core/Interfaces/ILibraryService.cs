using Core.DTOs;

namespace Core.Interfaces;

public interface ILibraryService
{
    Task<List<LibraryDto>> GetAllSubjects(string userId);
    Task<List<CategoryDto>> GetAllCategories();
}
