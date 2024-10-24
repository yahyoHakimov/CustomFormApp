using CustomFormApp.Server.Dto;
using CustomFormApp.Server.Interfaces.IServices;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.ComponentModel.DataAnnotations;

namespace CustomFormApp.Server.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class TemplatesController : ControllerBase
    {
        private readonly ITemplateService _templateService;
        private readonly IFormService _formService;

        public TemplatesController(ITemplateService templateService, IFormService formService)
        {
            _templateService = templateService;
            _formService = formService;
        }

        [HttpPost]
        [Authorize]
        public async Task<IActionResult> CreateTemplate([FromBody] TemplateDto templateDto)
        {
            var userId = User.Identity.Name;
            var createdTemplate = await _templateService.CreateTemplateAsync(templateDto, userId);
            return CreatedAtAction(nameof(GetTemplateById), new { id = createdTemplate.Id }, createdTemplate);
        }

        [HttpGet]
        public async Task<IActionResult> GetAllTemplates()
        {
            var templates = await _templateService.GetAllTemplatesAsync();
            return Ok(templates);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetTemplateById(int id)
        {
            var template = await _templateService.GetTemplateByIdAsync(id);
            if (template == null) return NotFound();
            return Ok(template);
        }



        [HttpDelete("{id}")]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> DeleteTemplate(int id)
        {
            var result = await _templateService.DeleteTemplateAsync(id);
            if (!result) return NotFound();
            return NoContent();
        }

        [HttpPost("{templateId}/submit")]
        public async Task<IActionResult> SubmitForm(int templateId, [FromBody] FormSubmissionDto submissionDto)
        {
            try
            {
                await _formService.SubmitFormAsync(templateId, submissionDto);
                return Ok(new { message = "Form submitted successfully" });
            }
            catch (ValidationException ex)
            {
                return BadRequest(new { error = ex.Message });
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { error = ex.Message });
            }
        }



        [HttpGet("{templateId}/responses")]
        public async Task<IActionResult> GetFormResponses(int templateId)
        {
            try
            {
                var responses = await _formService.GetFormResponsesAsync(templateId);
                return Ok(responses);
            } catch (Exception ex)
            {
                return StatusCode(500, new { error = ex.Message });
            }
            
        }
    }
}
