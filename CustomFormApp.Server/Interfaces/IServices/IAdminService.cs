using CustomFormApp.Server.Dto;
using CustomFormApp.Server.Models;

namespace CustomFormApp.Server.Interfaces.IServices
{
    public interface IAdminService
    {
        Task<List<UserDto>> GetAllUsersAsync();
        Task<bool> BlockUserAsync(string userId);
        Task<bool> UnblockUserAsync(string userId);
        Task<bool> UpdateUserRoleAsync(string userId, string role);
    }
}
