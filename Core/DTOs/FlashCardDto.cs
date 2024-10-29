using System;

namespace Core.DTOs;

public class FlashCardDto
{
    public required string Question { get; set; }
    public required string Answear { get; set; }
}
