using Core.DTOs;
using Core.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using WebApi.Extensions;

namespace WebApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PaymentController(IPaymentService paymentService) : ControllerBase
    {
        [Authorize]
        [HttpPost]
        public async Task<ActionResult<PaymentDto>> CreatePaymentIntent()
        {
            var userId = User.GetId();
            var payment = await paymentService.CreatePaymentIntent(userId);

            if (payment == null) return BadRequest("Problem with payment");

            return Ok(payment);
        }
    }
}
