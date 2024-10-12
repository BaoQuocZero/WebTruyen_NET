// Repository/ITHUOCRepository.cs
using NewProject.DTOs;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace NewProject.Repositories
{
    public interface IThuocRepository
    {
        Task<IEnumerable<ThuocReadDTO>> GetAllAsync();
        Task<ThuocReadDTO> GetByIdAsync(int maTruyen, int maTheLoai);
        Task<ThuocReadDTO> CreateAsync(ThuocCreateDTO dto);
        Task<bool> UpdateAsync(int maTruyen, int maTheLoai, ThuocUpdateDTO dto);
        Task<bool> DeleteAsync(int maTruyen, int maTheLoai);
    }
}



