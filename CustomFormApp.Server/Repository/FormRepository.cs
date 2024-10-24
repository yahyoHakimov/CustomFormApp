using CustomFormApp.Server.DbContext;
using CustomFormApp.Server.Interfaces.IRepository;
using CustomFormApp.Server.Models;
using System.Linq;
using Microsoft.EntityFrameworkCore;

namespace CustomFormApp.Server.Repository
{
    public class FormRepository : IFormRepository
    {
        private readonly ApplicationDbContext _dbContext;

        public FormRepository(ApplicationDbContext dbContext)
        {
            _dbContext = dbContext;
        }

        public async Task AddFormAsync(Form form)
        {
            await _dbContext.Forms.AddAsync(form);
            await _dbContext.SaveChangesAsync();
        }

        public IQueryable<Form> GetFormsByTemplateIdAsync(int templateId)
        {
            return _dbContext.Forms.Where(f => f.TemplateId == templateId).AsQueryable();
        }


        public async Task<Template> GetTemplateByIdAsync(int templateId)
        {
            return await _dbContext.Templates
                .Include(t => t.Questions) // Ensure questions are included if needed.
                .FirstOrDefaultAsync(t => t.Id == templateId);
        }
    }

}
