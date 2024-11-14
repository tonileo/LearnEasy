using System;

namespace Core.DTOs;

public class FlashCardDto
{
    public int Id { get; set; }
    public required string Question { get; set; }
    public required string Answear { get; set; }
}
