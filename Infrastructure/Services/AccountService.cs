using Core.DTOs;
using Core.Interfaces;
using Infrastructure.Data;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;

namespace Infrastructure.Services;

public class AccountService(AppDbContext context) : IAccountService
{
    public async Task UpdateUser(string id, EditAccountDto editAccountDto)
    {
        if (editAccountDto.FirstName.IsNullOrEmpty() && editAccountDto.LastName.IsNullOrEmpty())
        {
            throw new ArgumentException("At least one value has to be filled");
        }

        var user = await context.Users.Where(x => x.Id == id).SingleAsync();

        if (!editAccountDto.FirstName.IsNullOrEmpty() && !editAccountDto.LastName.IsNullOrEmpty())
        {
            user.FirstName = editAccountDto.FirstName;
            user.LastName = editAccountDto.LastName;
        }
        else if(!editAccountDto.FirstName.IsNullOrEmpty())
        {
            user.FirstName = editAccountDto.FirstName;
        }
        else
        {
            user.LastName = editAccountDto.LastName;
        }

        await context.SaveChangesAsync();
    }
}
