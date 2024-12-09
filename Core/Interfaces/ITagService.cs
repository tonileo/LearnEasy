using Core.DTOs;

namespace Core.Interfaces;

public interface ITagService
{
    Task<List<TagDto>> GetTags(string userId);
    Task<TagDto> CreateTag(string tagName);
}
