// Repository/ITHUOCRepository.cs
using System.Collections.Generic;
using System.Threading.Tasks;
using NewProject.Models;

namespace NewProject.Repository
{
    public interface IThuocRepository
    {
        Task<IEnumerable<THUOC>> GetAllAsync();
        Task<THUOC> GetByIdAsync(int maTruyen, int maTheLoai);
        Task<THUOC> AddAsync(THUOC THUOC);
        Task UpdateAsync(THUOC THUOC);
        Task DeleteAsync(int maTruyen, int maTheLoai);
        Task<bool> ExistsAsync(int maTruyen, int maTheLoai);
    }
}