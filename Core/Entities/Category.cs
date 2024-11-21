using Core.Entities.Abstractions;

namespace Core.Entities;

public class Category : BaseEntity
{
    public required string Name { get; set; }

    public ICollection<Subject> Subjects { get; set; } = [];
}
