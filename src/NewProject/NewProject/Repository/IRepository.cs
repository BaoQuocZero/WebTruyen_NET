// Repository/IRepository.cs
using System.Collections.Generic;
using System.Threading.Tasks;

namespace NewProject.Repository
{
    public interface IRepository<T> where T : class
    {
        Task<IEnumerable<T>> GetAllAsync();
        Task<T> GetByIdAsync(int id); // Thêm Async
        Task<T> AddNewAsync(T entity); // Thêm Async
        Task UpdateWithIdAsync(T entity); // Thêm Async
        Task DeleteWithIdAsync(T entity); // Thêm Async
    }
}
