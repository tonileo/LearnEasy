using System;
using System.ComponentModel.DataAnnotations;

namespace Core.Entities;

public class FlashCard : BaseEntity
{
    public required string Question { get; set; }
    public required string Answear { get; set; }

    [Required]
    public int SubjectId { get; set; }
    [Required]
    public virtual Subject? Subject {get; set;}
    [Required]
    public int TagId { get; set; }
    [Required]
    public virtual Tag? Tag { get; set; }
}
