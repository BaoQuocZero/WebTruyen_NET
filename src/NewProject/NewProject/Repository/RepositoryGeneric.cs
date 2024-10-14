// Repository/RepositoryGeneric.cs
using Microsoft.EntityFrameworkCore;
using NewProject.Data;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace NewProject.Repository
{
    public class RepositoryGeneric<T> : IRepository<T> where T : class
    {
        private readonly MyDbContext _context;
        private readonly DbSet<T> _entities;

        public RepositoryGeneric(MyDbContext context)
        {
            _context = context;
            _entities = _context.Set<T>();
        }

        public async Task<T> AddNewAsync(T entity)
        {
            var newEntity = await _entities.AddAsync(entity);
            await _context.SaveChangesAsync();
            return newEntity.Entity;
        }

        public async Task DeleteWithIdAsync(T entity)
        {
            _entities.Remove(entity);
            await _context.SaveChangesAsync();
        }

        public async Task<IEnumerable<T>> GetAllAsync()
        {
            return await _entities.ToListAsync();
        }

        public async Task<T> GetByIdAsync(int id)
        {
            return await _entities.FindAsync(id);
        }

        public async Task UpdateWithIdAsync(T entity)
        {
            _entities.Update(entity);
            await _context.SaveChangesAsync();
        }
    }
}