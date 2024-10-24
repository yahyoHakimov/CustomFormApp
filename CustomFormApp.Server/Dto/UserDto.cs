﻿namespace CustomFormApp.Server.Dto
{
    public class UserDto
    {
        public string Id { get; set; }
        public string UserName { get; set; }
        public string Email { get; set; }
        public List<string> Roles { get; set; }
        public DateTimeOffset? LockoutEnd { get; set; }
    }

}
