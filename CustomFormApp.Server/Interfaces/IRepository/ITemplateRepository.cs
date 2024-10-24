using CustomFormApp.Server.Models;

namespace CustomFormApp.Server.Interfaces.IRepository
{
    public interface ITemplateRepository
    {
        Task<Template> GetByIdAsync(int id);
        Task<List<Template>> GetAllAsync();
        Task<Template> CreateAsync(Template template);
        Task<bool> UpdateAsync(Template template);
        Task<bool> DeleteAsync(int id);
    }
}
