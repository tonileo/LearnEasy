using System.ComponentModel.DataAnnotations;

namespace Core.DTOs;

public class FlashCardRequestDto
{
    [Required]
    public string Question { get; set; } = string.Empty;

    [Required]
    public string Answear { get; set; } = string.Empty;
    public int? TagId { get; set; }
}
