using Core.DTOs;

namespace Core.Interfaces;

public interface IOrderService
{
    Task CreateOrder(CreateOrderDto createOrderDto, string email);
    Task UpdateOrderStatus(string intentId, long intentAmount);
}
