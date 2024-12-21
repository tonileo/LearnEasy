using Core.DTOs;
using Core.Entities;
using Core.Interfaces;
using Infrastructure.Data;
using Microsoft.EntityFrameworkCore;

namespace Infrastructure.Services;

public class OrderService(AppDbContext context) : IOrderService
{
    public async Task CreateOrder(CreateOrderDto createOrderDto, string email)
    {
        if (createOrderDto.PaymentIntentId == null) throw new ArgumentException("No payment intent!");

        var order = new Order
        {
            Price = createOrderDto.Price,
            BuyerEmail = email,
            PaymentIntentId = createOrderDto.PaymentIntentId,
            PaymentSummary = createOrderDto.PaymentSummary
        };

        await context.Orders.AddAsync(order);
        await context.SaveChangesAsync();
    }

    public async Task UpdateOrderStatus(string intentId, long intentAmount)
    {
        var order = await context.Orders
            .Where(x => x.PaymentIntentId == intentId)
            .AsNoTracking()
            .FirstOrDefaultAsync();

        if (order == null) throw new Exception("Order not found!");

        if ((long)order.Price * 100 != intentAmount)
        {
            order.OrderStatus = OrderStatus.PaymentMismatch;
        }
        else
        {
            order.OrderStatus = OrderStatus.PaymentReceived;
        }

        await context.SaveChangesAsync();
    }
}
