using System.ComponentModel.DataAnnotations;
using Core.Entities;

namespace Core.DTOs;

public class OrderDto
{
    [Required]
    public DateTime OrderDate { get; set; }

    [Required]
    public string BuyerEmail { get; set; } = string.Empty;

    [Required]
    public decimal Price { get; set; }

    [Required]
    public string PaymentIntentId { get; set; } = string.Empty;

    [Required]
    public OrderStatus OrderStatus {get; set; }

    [Required]
    public PaymentSummary PaymentSummary { get; set; } = null!;
}