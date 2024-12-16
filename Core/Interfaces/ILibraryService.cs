using Core.DTOs;

namespace Core.Interfaces;

public interface ILibraryService
{
    Task<List<LibraryDto>> GetAllSubjects(string userId, int? categoryId);
    Task<List<CategoryDto>> GetAllCategories();
}
