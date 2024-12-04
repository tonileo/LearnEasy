using System.ComponentModel.DataAnnotations;

namespace Core.DTOs;

public class CategoryDto
{
    public int Id { get; set; }

    [Required]
    public string Name { get; set; } = string.Empty;
}
