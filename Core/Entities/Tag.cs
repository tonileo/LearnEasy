using Core.Entities.Abstractions;

namespace Core.Entities;

public class Tag : BaseEntity
{
    public string? Name { get; set; }

    public virtual ICollection<FlashCard> FlashCards { get; set; } = [];
}
