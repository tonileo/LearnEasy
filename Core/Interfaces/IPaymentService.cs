using Core.DTOs;

namespace Core.Interfaces;

public interface IPaymentService
{
    Task<PaymentDto> CreatePaymentIntent(string userId);
}
