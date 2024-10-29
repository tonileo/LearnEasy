using System;
using System.ComponentModel.DataAnnotations;

namespace Core.DTOs;

public class SubjectRequestDto
{
    [Required]
    public required string Name { get; set; }
}
