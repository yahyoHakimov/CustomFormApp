using AutoMapper;
using CustomFormApp.Server.DbContext;
using CustomFormApp.Server.Dto;
using CustomFormApp.Server.Interfaces.IRepository;
using CustomFormApp.Server.Interfaces.IServices;
using CustomFormApp.Server.Models;
using Microsoft.EntityFrameworkCore;

namespace CustomFormApp.Server.Services
{
    public class TemplateService : ITemplateService
    {
        private readonly ITemplateRepository _templateRepository;
        private readonly IMapper _mapper;

        public TemplateService(ITemplateRepository templateRepository, IMapper mapper)
        {
            _templateRepository = templateRepository;
            _mapper = mapper;
        }

        public async Task<TemplateDto> CreateTemplateAsync(TemplateDto templateDto, string userId)
        {
            var template = _mapper.Map<Template>(templateDto);
            template.CreatedBy = userId;

            var createdTemplate = await _templateRepository.CreateAsync(template);
            return _mapper.Map<TemplateDto>(createdTemplate);
        }

        public async Task<List<TemplateDto>> GetAllTemplatesAsync()
        {
            var templates = await _templateRepository.GetAllAsync();
            return _mapper.Map<List<TemplateDto>>(templates);
        }

        public async Task<TemplateDto> GetTemplateByIdAsync(int id)
        {
            var template = await _templateRepository.GetByIdAsync(id);
            return _mapper.Map<TemplateDto>(template);
        }

        public async Task<bool> DeleteTemplateAsync(int id)
        {
            return await _templateRepository.DeleteAsync(id);
        }

        public async Task<bool> UpdateTemplateAsync(TemplateDto templateDto)
        {
            var template = _mapper.Map<Template>(templateDto);
            return await _templateRepository.UpdateAsync(template);
        }
    }
}
