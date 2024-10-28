using System;
using System.ComponentModel.DataAnnotations;

namespace Core.Entities;

public class Note : BaseEntity
{
    public string? Name { get; set; }
    public string? Text { get; set; }
    public DateTime CreatedAt { get; set; }
    public DateTime LastChanged { get; set; }

    [Required]
    public int SubjectId { get; set; }
    [Required]
    public virtual Subject? Subject { get; set; }
}
