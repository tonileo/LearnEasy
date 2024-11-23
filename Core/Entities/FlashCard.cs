using System.ComponentModel.DataAnnotations;
using Core.Entities.Abstractions;

namespace Core.Entities;

public class FlashCard : BaseEntity
{
    [Required]
    public required string Question { get; set; }

    [Required]
    public required string Answear { get; set; }

    public DateTime? LastReviewed { get; set; }

    [Required]
    public int SubjectId { get; set; }
    
    [Required]
    public virtual Subject? Subject {get; set;}
    public int? TagId { get; set; }
    public virtual Tag? Tag { get; set; }
}
