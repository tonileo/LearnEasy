using Core.DTOs;
using Core.Entities;
using Core.Interfaces;
using Infrastructure.Data;
using Microsoft.EntityFrameworkCore;

namespace Infrastructure.Services;

public class TagService(AppDbContext context) : ITagService
{
    public async Task<List<TagDto>> GetTags(string userId)
    {
        var tags = await context.Tags
            .Include(u => u.FlashCards)
            .ThenInclude(s => s.Subject)
            .Where(t => t.FlashCards
                .Any(fc => fc.Subject != null && fc.Subject.UserId == userId))
            .AsNoTracking().ToListAsync();

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

    public async Task<TagDto> CreateTag(string tagName)
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

        return new TagDto
        {
            Id = tag.Id,
            Name = tag.Name
        };
    }
}
