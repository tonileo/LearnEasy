using System;

namespace Core.DTOs;

public class SubjectDto
{
    public required string Name { get; set; }
    public List<string> FlashCardQuestions { get; set; } = [];
    public List<string?> NoteNames { get; set; } = [];
    public List<string?> PdfFileNames { get; set; } = [];
}
