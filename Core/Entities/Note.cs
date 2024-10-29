using System;
using System.ComponentModel.DataAnnotations;
using Core.Entities.Abstractions;

namespace Core.Entities;

public class Note : BaseEntity
{
    public string? Name { get; set; }
    public string? Text { get; set; }

    [Required]
    public DateTime CreatedAt { get; set; }

    [Required]
    public DateTime LastChanged { get; set; }

    [Required]
    public int SubjectId { get; set; }
    [Required]
    public virtual Subject? Subject { get; set; }
}
