using Core.DTOs;
using Core.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using WebApi.Extensions;

namespace WebApi.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class OrderController(IOrderService orderService) : ControllerBase
    {
        [HttpPost]
        public async Task<ActionResult> CreateOrder(CreateOrderDto createOrderDto)
        {
            var email = User.GetEmail();

            await orderService.CreateOrder(createOrderDto, email);

            return Ok();
        }
    }
}
