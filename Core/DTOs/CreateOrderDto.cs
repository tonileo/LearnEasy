using System.ComponentModel.DataAnnotations;
using Core.Entities;

namespace Core.DTOs;

public class CreateOrderDto
{
    [Required]
    public decimal Price { get; set; }

    [Required]
    public required string PaymentIntentId { get; set; }

    [Required]
    public PaymentSummary PaymentSummary { get; set; } = null!;
}
