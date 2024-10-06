// Repository/ThuocRepository.cs
using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using NewProject.Data;
using NewProject.Models;

namespace NewProject.Repository
{
    public class ThuocRepository : IThuocRepository
    {
        private readonly MyDbContext _context;

        public ThuocRepository(MyDbContext context)
        {
            _context = context;
        }

        public async Task<IEnumerable<THUOC>> GetAllAsync()
        {
            return await _context.THUOCs
                .Include(t => t.TRUYEN_TRANH)
                .Include(t => t.THE_LOAI)
                .ToListAsync();
        }

        public async Task<THUOC> GetByIdAsync(int maTruyen, int maTheLoai)
        {
            return await _context.THUOCs
                .Include(t => t.TRUYEN_TRANH)
                .Include(t => t.THE_LOAI)
                .FirstOrDefaultAsync(t => t.MA_TRUYEN == maTruyen && t.MA_THE_LOAI == maTheLoai);
        }

        public async Task<THUOC> AddAsync(THUOC THUOC)
        {
            _context.THUOCs.Add(THUOC);
            await _context.SaveChangesAsync();
            return THUOC;
        }

        public async Task UpdateAsync(THUOC THUOC)
        {
            _context.Entry(THUOC).State = EntityState.Modified;
            await _context.SaveChangesAsync();
        }

        public async Task DeleteAsync(int maTruyen, int maTheLoai)
        {
            var THUOC = await GetByIdAsync(maTruyen, maTheLoai);
            if (THUOC != null)
            {
                _context.THUOCs.Remove(THUOC);
                await _context.SaveChangesAsync();
            }
        }

        public async Task<bool> ExistsAsync(int maTruyen, int maTheLoai)
        {
            return await _context.THUOCs.AnyAsync(t => t.MA_TRUYEN == maTruyen && t.MA_THE_LOAI == maTheLoai);
        }
    }
}
