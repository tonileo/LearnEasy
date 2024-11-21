using Core.DTOs;
using Core.Entities;
using Core.Interfaces;
using Infrastructure.Data;
using Microsoft.EntityFrameworkCore;

namespace Infrastructure.Services;

public class TagService(AppDbContext context) : ITagService
{
    public async Task<List<TagDto>> GetTags()
    {
        try
        {
            var tags = await context.Tags.AsNoTracking().ToListAsync();

            var tagList = new List<TagDto>();
            foreach (var tag in tags)
            {
                tagList.Add(new TagDto()
                {
                    Id = tag.Id,
                    Name = tag.Name ?? string.Empty
                });
            }

            return tagList;
        }
        catch (Exception ex)
        {
            throw new InvalidOperationException("Problem with loading tags: " + ex.Message);
        }
    }

    public async Task<TagDto> CreateTag(string tagName)
    {
        try
        {
            if (string.IsNullOrEmpty(tagName))
            {
                throw new InvalidOperationException("Tag name has to be filled");
            }

            var tag = new Tag
            {
                Name = tagName
            };

            await context.AddAsync(tag);
            await context.SaveChangesAsync();

            return new TagDto{
                Id = tag.Id,
                Name = tag.Name
            };
        }
        catch (Exception ex)
        {
            throw new InvalidOperationException("Problem with adding the Tag: " + ex.Message);
        }
    }
}
