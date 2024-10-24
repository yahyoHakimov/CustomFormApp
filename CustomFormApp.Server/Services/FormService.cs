using CustomFormApp.Server.Dto;
using CustomFormApp.Server.Interfaces.IRepository;
using CustomFormApp.Server.Interfaces.IServices;
using CustomFormApp.Server.Models;
using Microsoft.AspNetCore.Cors.Infrastructure;
using Newtonsoft.Json;
using System.Security.Claims;

namespace CustomFormApp.Server.Services
{
    public class FormService : IFormService
    {
        private readonly IFormRepository _formRepository;
        private readonly IHttpContextAccessor _httpContextAccessor;

        public FormService(IFormRepository formRepository, IHttpContextAccessor httpContextAccessor)
        {
            _formRepository = formRepository;
            _httpContextAccessor = httpContextAccessor;
        }

        public async Task SubmitFormAsync(int templateId, FormSubmissionDto submissionDto)
        {
            var userId = _httpContextAccessor.HttpContext.User.FindFirstValue(ClaimTypes.NameIdentifier);

            var form = new Form
            {
                TemplateId = templateId,
                UserId = int.Parse(userId),
                SubmittedData = JsonConvert.SerializeObject(submissionDto.Answers),
                SubmittedAt = DateTime.UtcNow
            };

            await _formRepository.AddFormAsync(form);
        }

        public async Task<List<FormResponseDto>> GetFormResponsesAsync(int templateId)
        {
            var forms = await _formRepository.GetFormsByTemplateIdAsync(templateId);

            return forms.Select(f => new FormResponseDto
            {
                UserId = f.UserId,
                SubmittedAt = f.SubmittedAt,
                SubmittedData = JsonConvert.DeserializeObject<Dictionary<string, string>>(f.SubmittedData)
            }).ToList();
        }
    }

}
