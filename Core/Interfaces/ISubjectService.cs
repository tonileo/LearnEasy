using Core.DTOs;
using Core.Entities;

namespace Core.Interfaces;

public interface ISubjectService
{
    Task<SubjectDto> GetSubject(int id);
    Task AddSubject(SubjectRequestDto SubjectRequestDto);
}
