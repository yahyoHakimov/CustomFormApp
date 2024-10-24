namespace CustomFormApp.Server.Controllers
{
    using CustomFormApp.Server.Dto;
    using CustomFormApp.Server.Interfaces.IServices;
    using Microsoft.AspNetCore.Authorization;
    using Microsoft.AspNetCore.Mvc;

    [Authorize(Roles = "Admin")]
    [ApiController]
    [Route("api/admin")]
    public class AdminController : ControllerBase
    {
        private readonly IAdminService _adminService;

        public AdminController(IAdminService adminService)
        {
            _adminService = adminService;
        }

        [HttpGet("users")]
        public async Task<IActionResult> GetAllUsers()
        {
            var users = await _adminService.GetAllUsersAsync();
            return Ok(users);
        }

        [HttpPost("block")]
        public async Task<IActionResult> BlockUser([FromBody] string userId)
        {
            var success = await _adminService.BlockUserAsync(userId);
            if (!success) return NotFound();
            return Ok();
        }

        [HttpPost("unblock")]
        public async Task<IActionResult> UnblockUser([FromBody] string userId)
        {
            var success = await _adminService.UnblockUserAsync(userId);
            if (!success) return NotFound();
            return Ok();
        }

        [HttpPut("role")]
        public async Task<IActionResult> UpdateUserRole([FromBody] UpdateUserRoleDto dto)
        {
            var success = await _adminService.UpdateUserRoleAsync(dto.UserId, dto.Role);
            if (!success) return NotFound();
            return Ok();
        }
    }

}
