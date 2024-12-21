using Core.Entities.Abstractions;

namespace Core.Entities;

public class Order : BaseEntity
{
    public DateTime OrderDate { get; set; } = DateTime.UtcNow;
    public required string BuyerEmail { get; set; }
    public decimal Price { get; set; }
    public required string PaymentIntentId { get; set; }
    public OrderStatus OrderStatus {get; set; } = OrderStatus.Pending;
    public PaymentSummary PaymentSummary { get; set; } = null!;
}
