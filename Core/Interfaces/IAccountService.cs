using Core.DTOs;

namespace Core.Interfaces;

public interface IAccountService
{
    Task UpdateUser(string id, EditAccountDto editAccountDto);
}
