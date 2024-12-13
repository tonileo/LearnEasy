using Core.Entities.Abstractions;

namespace Core.Entities;

public class PdfFile : BaseEntity
{
    public required string Name { get; set; }

    public required string Path { get; set; }

    public DateTime CreatedAt { get; set; }  = DateTime.Now;

    public int SubjectId { get; set; }
    public virtual Subject? Subject { get; set; }
}
