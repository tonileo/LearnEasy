using Core.DTOs;
using Core.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Stripe;
using WebApi.Extensions;

namespace WebApi.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class PaymentController(IPaymentService paymentService, IOrderService orderService) : ControllerBase
    {
        private readonly string _whSecret = "";

        [HttpPost]
        public async Task<ActionResult<PaymentDto>> CreatePaymentIntent()
        {
            var userId = User.GetId();
            var payment = await paymentService.CreatePaymentIntent(userId);

            if (payment == null) return BadRequest("Problem with payment");

            return Ok(payment);
        }

        [HttpPost("webhook")]
        public async Task<IActionResult> StripeWebhook()
        {
            var json = await new StreamReader(Request.Body).ReadToEndAsync();

            try
            {
                var stripeEvent = ConstructStripeEvent(json);

                if (stripeEvent.Data.Object is not PaymentIntent intent)
                {
                    return BadRequest("Invalid event data");
                }

                await HandlePaymentIntentSucceeded(intent);

                return Ok();
            }
            catch (StripeException ex)
            {
                throw new Exception("Unexpected error", ex);
            }
        }

        private async Task HandlePaymentIntentSucceeded(PaymentIntent intent)
        {
            if (intent.Status == "succeeded")
            {
                await orderService.UpdateOrderStatus(intent.Id, intent.Amount);
            }
        }

        private Event ConstructStripeEvent(string json)
        {
            try
            {
                return EventUtility.ConstructEvent(json, Request.Headers["Stripe-Signature"], _whSecret);
            }
            catch (Exception ex)
            {
                throw new StripeException("Invalid signature ", ex);
            }
        }
    }
}
