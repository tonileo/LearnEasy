using System.ComponentModel.DataAnnotations;

namespace Core.DTOs;

public class TagDto
{
    public int Id { get; set; }

    [Required]
    public string Name { get; set; } = string.Empty;
}
