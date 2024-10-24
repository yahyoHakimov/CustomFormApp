using CustomFormApp.Server.Models;

namespace CustomFormApp.Server.Interfaces.IRepository
{
    public interface IFormRepository
    {
        Task AddFormAsync(Form form);
        Task<List<Form>> GetFormsByTemplateIdAsync(int templateId);
    }

}
