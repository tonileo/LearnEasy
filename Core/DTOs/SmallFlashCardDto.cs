using System.ComponentModel.DataAnnotations;

namespace Core.DTOs;

public class SmallFlashCardDto
{
    public int Id { get; set; }

    [Required]
    public string Question { get; set; } = string.Empty;
    public string? TagName { get; set; }
}
