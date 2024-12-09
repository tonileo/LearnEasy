using System.ComponentModel.DataAnnotations;
using Core.Entities.Abstractions;

namespace Core.Entities;

public class Subject : BaseEntity
{
    [StringLength(EntityConstants.SHORT_LENGTH_TEXT)]
    public required string Name { get; set; }

    public required string Color { get; set; }

    public required string UserId { get; set; }
    public virtual AppUser? User { get; set; }

    public required int CategoryId { get; set; }
    public virtual Category? Category { get; set; }

    public virtual ICollection<Note> Notes { get; set; } = [];
    public virtual ICollection<PdfFile> PdfFiles { get; set; } = [];
    public virtual ICollection<FlashCard> FlashCards { get; set; } = [];
}
