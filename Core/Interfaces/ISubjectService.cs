using Core.DTOs;
using Core.Entities;

namespace Core.Interfaces;

public interface ISubjectService
{
    Task<List<LibraryDto>> GetAllSubjects();
    Task<List<CategoryDto>> GetAllCategories();
    Task<SubjectDto> GetSubject(int id);
    Task AddSubject(SubjectRequestDto SubjectRequestDto);
}
