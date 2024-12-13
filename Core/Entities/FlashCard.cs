using Core.Entities.Abstractions;

namespace Core.Entities;

public class FlashCard : BaseEntity
{
    public required string Question { get; set; }
    public required string Answer { get; set; }
    public DateTime? LastReviewed { get; set; }

    public int SubjectId { get; set; }
    public virtual Subject? Subject {get; set;}

    public int? TagId { get; set; }
    public virtual Tag? Tag { get; set; }
}
