using System;
using System.ComponentModel.DataAnnotations;
using Core.Entities.Abstractions;

namespace Core.Entities;

public class PdfFile : BaseEntity
{
    public string? Name { get; set; }
    public required string Path { get; set; }
    public DateTime CreatedAt { get; set; }

    [Required]
    public int SubjectId { get; set; }
    [Required]
    public virtual Subject? Subject { get; set; }
}
