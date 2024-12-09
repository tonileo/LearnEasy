using System.ComponentModel.DataAnnotations;
using Core.Entities.Abstractions;

namespace Core.Entities;

public class Note : BaseEntity
{
    public string? Name { get; set; }
    public string? Text { get; set; }

    public DateTime CreatedAt { get; set; } = DateTime.Now;

    public DateTime LastChanged { get; set; } = DateTime.Now;

    public int SubjectId { get; set; }
    public virtual Subject? Subject { get; set; }
}
