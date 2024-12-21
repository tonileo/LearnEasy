using Core.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Infrastructure.Config;

public class OrderConfiguration : IEntityTypeConfiguration<Order>
{
    public void Configure(EntityTypeBuilder<Order> builder)
    {
        builder
            .OwnsOne(x => x.PaymentSummary, o => o.WithOwner());

        builder
            .Property(x => x.Price)
            .HasColumnType("decimal(18,2)");

        builder
            .Property(x => x.OrderDate)
            .HasConversion(
                d => d.ToUniversalTime(),
                d => DateTime.SpecifyKind(d, DateTimeKind.Utc)
            );

        builder
            .Property(x => x.OrderStatus)
            .HasConversion(
                y => y.ToString(),
                y => (OrderStatus)Enum.Parse(typeof(OrderStatus), y)
            );
    }
}
