using Core.DTOs;

namespace Core.Interfaces;

public interface ISubjectService
{
    Task<SubjectDto> GetSubject(int id);
    Task AddSubject(SubjectRequestDto SubjectRequestDto);
    Task EditSubject(int subjectId, SubjectRequestDto SubjectRequestDto);
    Task DeleteSubject(int id);
}
