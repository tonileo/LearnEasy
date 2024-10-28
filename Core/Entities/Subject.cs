using System;

namespace Core.Entities;

public class Subject : BaseEntity
{
    public required string Name { get; set; }

    public virtual ICollection<Note> Notes {get; set;} =  [];
    public virtual ICollection<PdfFile> PdfFiles { get; set; } = [];
    public virtual ICollection<FlashCard> FlashCards { get; set; } = [];
}
