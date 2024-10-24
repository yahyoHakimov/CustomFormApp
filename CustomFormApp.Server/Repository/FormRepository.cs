using CustomFormApp.Server.DbContext;
using CustomFormApp.Server.Interfaces.IRepository;
using CustomFormApp.Server.Models;

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

        public async Task<List<Form>> GetFormsByTemplateIdAsync(int templateId)
        {
            return await _dbContext.Forms
                .Where(f => f.TemplateId == templateId)
                .ToListAsync();
        }
    }

}
