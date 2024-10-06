<<<<<<< HEAD
﻿// Repository/ITHUOCRepository.cs
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
=======
﻿using NewProject.Models;

namespace NewProject.Repository
{
    public interface IThuocRepository : IRepository<THUOC>
    {
    }
}
>>>>>>> 405b27948618d1f1e1b26c80d795310b0b21465f
