using System.ComponentModel.DataAnnotations;

namespace Core.DTOs;

public class LibraryDto
{
    public int SubjectId { get; set; }

    [Required]
    public string Name { get; set; } = string.Empty;

    [Required]
    public string CategoryName { get; set; } = "Other";

    [Required]
    public string Color { get; set; } = "blue";

    public int FlashCardsCount { get; set; }
    public int PdfFilesCount { get; set; }
    public int NotesCount { get; set; }
}
