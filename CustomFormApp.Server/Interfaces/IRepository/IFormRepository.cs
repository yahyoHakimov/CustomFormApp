using CustomFormApp.Server.Models;

namespace CustomFormApp.Server.Interfaces.IRepository
{
    public interface IFormRepository
    {
        Task AddFormAsync(Form form);
        IQueryable<Form> GetFormsByTemplateIdAsync(int templateId);
        Task<Template> GetTemplateByIdAsync(int templateId);

    }

}
