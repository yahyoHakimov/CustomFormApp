using CustomFormApp.Server.Dto;
using CustomFormApp.Server.Interfaces.IRepository;
using CustomFormApp.Server.Interfaces.IServices;
using CustomFormApp.Server.Models;
using Microsoft.AspNetCore.Cors.Infrastructure;
using Newtonsoft.Json;
using System.Security.Claims;
using System.Linq;
using Microsoft.EntityFrameworkCore;


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

            var template = await _formRepository.GetTemplateByIdAsync(templateId);
            if (template == null) throw new Exception("Template not found.");

            // Validate the provided answers against the template's questions
            foreach (var question in template.Questions)
            {
                if (!submissionDto.Answers.ContainsKey(question.Title))
                {
                    throw new Exception($"Answer for '{question.Title}' is required.");
                }
            }

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

        public async Task<List<FormResponseDto>> GetFormResponsesAsync(int templateId, int page = 1, int pageSize = 10)
        {
            var formsQuery = _formRepository.GetFormsByTemplateIdAsync(templateId);

            // Apply Skip and Take for pagination before awaiting
            var forms = await formsQuery
                .Skip((page - 1) * pageSize)
                .Take(pageSize)
                .ToListAsync();

            return forms.Select(f => new FormResponseDto
            {
                UserId = f.UserId,
                SubmittedAt = f.SubmittedAt,
                SubmittedData = JsonConvert.DeserializeObject<Dictionary<string, string>>(f.SubmittedData)
            }).ToList();
        }


    }

}
