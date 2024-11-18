using System;

namespace Core.DTOs;

public class SubjectDto
{
    public required string Name { get; set; }
    public List<SmallFlashCardDto?> FlashCards { get; set; } = [];
    public List<string?> NoteNames { get; set; } = [];
    public List<string?> PdfFileNames { get; set; } = [];

    public int FlashCardsCount { get; set; }
    public int PdfFilesCount { get; set; }
    public int NotesCount { get; set; }
}
