namespace Core.DTOs;

public class SmallFlashCardDto
{
    public int Id { get; set; }
    public required string Question { get; set; }
    public string? TagName { get; set; }
}
