using CustomFormApp.Server.Dto;

namespace CustomFormApp.Server.Interfaces.IServices
{
    public interface ITemplateService
    {
        Task<TemplateDto> CreateTemplateAsync(TemplateDto templateDto, string userId);
        Task<List<TemplateDto>> GetAllTemplatesAsync();
        Task<TemplateDto> GetTemplateByIdAsync(int id);
        Task<bool> DeleteTemplateAsync(int id);
    }
}
