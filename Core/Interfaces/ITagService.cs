using Core.DTOs;

namespace Core.Interfaces;

public interface ITagService
{
    Task<List<TagDto>> GetTags();
    Task<TagDto> CreateTag(string tagName);
}
