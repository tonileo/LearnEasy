using System.ComponentModel.DataAnnotations;

namespace Core.DTOs;

public class SubjectRequestDto
{
    [Required]
    public string Name { get; set; } = string.Empty;
    public int CategoryId { get; set; }

    [Required]
    public string Color { get; set; } = string.Empty;
}
