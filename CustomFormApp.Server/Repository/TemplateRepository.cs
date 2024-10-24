using CustomFormApp.Server.DbContext;
using CustomFormApp.Server.Interfaces.IRepository;
using CustomFormApp.Server.Models;
using Microsoft.EntityFrameworkCore;

namespace CustomFormApp.Server.Repository
{
    public class TemplateRepository : ITemplateRepository
    {
        private readonly ApplicationDbContext _context;

        public TemplateRepository(ApplicationDbContext context)
        {
            _context = context;
        }

        public async Task<Template> GetByIdAsync(int id)
        {
            return await _context.Templates.FindAsync(id);
        }

        public async Task<List<Template>> GetAllAsync()
        {
            return await _context.Templates.ToListAsync();
        }

        public async Task<Template> CreateAsync(Template template)
        {
            _context.Templates.Add(template);
            await _context.SaveChangesAsync();
            return template;
        }

        public async Task<bool> UpdateAsync(Template template)
        {
            _context.Templates.Update(template);
            return await _context.SaveChangesAsync() > 0;
        }

        public async Task<bool> DeleteAsync(int id)
        {
            var template = await GetByIdAsync(id);
            if (template == null)
                return false;

            _context.Templates.Remove(template);
            return await _context.SaveChangesAsync() > 0;
        }
    }
}
