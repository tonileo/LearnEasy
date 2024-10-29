using System;
using Core.Entities.Abstractions;

namespace Core.Entities;

public class Tag : BaseEntity
{
    public required string Name { get; set; }

    public virtual ICollection<FlashCard> FlashCards { get; set; } = [];
}
