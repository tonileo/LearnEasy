using System;
using System.ComponentModel.DataAnnotations;
using Core.Entities.Abstractions;

namespace Core.Entities;

public class PdfFile : BaseEntity
{
    [Required]
    public required string Name { get; set; }

    [Required]
    public required string Path { get; set; }

    [Required]
    public DateTime CreatedAt { get; set; }

    [Required]
    public int SubjectId { get; set; }
    [Required]
    public virtual Subject? Subject { get; set; }
}
