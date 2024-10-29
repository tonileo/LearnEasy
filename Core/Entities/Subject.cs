using System;
using System.ComponentModel.DataAnnotations;
using Core.Entities.Abstractions;

namespace Core.Entities;

public class Subject : BaseEntity
{
    [Required]
    [StringLength(EntityConstants.SHORT_LENGTH_TEXT)]
    public required string Name { get; set; }

    [Required]
    public required string Color { get; set; }

    public int? CategoryId { get; set; }
    public virtual Category? Category { get; set; }

    public virtual ICollection<Note> Notes {get; set;} =  [];
    public virtual ICollection<PdfFile> PdfFiles { get; set; } = [];
    public virtual ICollection<FlashCard> FlashCards { get; set; } = [];
}
