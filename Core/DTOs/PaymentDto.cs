namespace Core.DTOs;

public class PaymentDto
{
    public string? ClientSecret { get; set; }
    public string? PaymentIntentId { get; set; }
}
