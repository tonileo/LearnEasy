using Core.DTOs;
using Core.Interfaces;
using Microsoft.Extensions.Configuration;
using Stripe;

namespace Infrastructure.Services;

public class PaymentService(IConfiguration config) : IPaymentService
{
    public async Task<PaymentDto> CreatePaymentIntent(string userId)
    {
        var price = 5;

        StripeConfiguration.ApiKey = config["StripeSettings:SecretKey"];

        var service = new PaymentIntentService();
        PaymentIntent? intent = null;

        var options = new PaymentIntentCreateOptions
        {
            Amount = (long)price * 100,
            Currency = "eur",
            PaymentMethodTypes = ["card"]
        };
        intent = await service.CreateAsync(options);
        
        return new PaymentDto (){
            PaymentIntentId = intent.Id,
            ClientSecret = intent.ClientSecret
        };
    }
}
