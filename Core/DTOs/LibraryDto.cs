using System;

namespace Core.DTOs;

public class LibraryDto
{
    public int SubjectId { get; set; }
    public required string Name { get; set; }
    public required string CategoryName { get; set; } = "Other";
    public required string Color { get; set; } = "blue";

    public int FlashCardsCount { get; set; }
    public int PdfFilesCount { get; set; }
    public int NotesCount { get; set; }
}
