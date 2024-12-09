using Core.DTOs;

namespace Core.Interfaces;

public interface ISubjectService
{
    Task<SubjectDto> GetSubject(int id);
    Task AddSubject(SubjectRequestDto SubjectRequestDto, string userId);
    Task EditSubject(int subjectId, string userId, SubjectRequestDto SubjectRequestDto);
    Task DeleteSubject(int id);
}
