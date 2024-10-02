using Microsoft.EntityFrameworkCore;
using NewProject.Data;

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

        public async Task<T> AddNew(T entity)
        {
            var newEntity = await _entities.AddAsync(entity);
            await _context.SaveChangesAsync();
            return newEntity.Entity;

        }

        public void DeleteWithId(T entity)
        {

            _entities.Remove(entity);
            _context.SaveChanges();
        }

        public async Task<IEnumerable<T>> GetAll()
        {
            return await _entities.ToListAsync();
        }

        public async Task<T> GetById(int id)
        {
            var entityId = await _entities.FindAsync(id);
            if (entityId == null)
            {
                return null;
            }
            else
            {
                return entityId;
            }
        }

        public void UpdateWithId(T entity)
        {
            _entities.Update(entity);
            _context.SaveChanges();
        }


    }
}
