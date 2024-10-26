// Repository/ThuocRepository.cs
using Microsoft.EntityFrameworkCore;
using NewProject.Data;
using NewProject.DTOs;
using NewProject.Models;
using NewProject.Repository;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace NewProject.Repositories
{
    public class ThuocRepository : IThuocRepository
    {
        private readonly MyDbContext _context;

        public ThuocRepository(MyDbContext context)
        {
            _context = context;
        }

        public async Task<ThuocReadDTO> CreateAsync(ThuocCreateDTO dto)
        {
            var thuoc = new THUOC
            {
                MA_TRUYEN = dto.MA_TRUYEN,
                MA_THE_LOAI = dto.MA_THE_LOAI
            };

            _context.THUOCs.Add(thuoc);
            await _context.SaveChangesAsync();

            return await GetByIdAsync(dto.MA_TRUYEN, dto.MA_THE_LOAI);
        }

        public async Task<bool> DeleteAsync(int maTruyen, int maTheLoai)
        {
            var thuoc = await _context.THUOCs.FindAsync(maTruyen, maTheLoai);
            if (thuoc == null)
                return false;

            _context.THUOCs.Remove(thuoc);
            await _context.SaveChangesAsync();
            return true;
        }

        public async Task<IEnumerable<ThuocReadDTO>> GetAllAsync()
        {
            return await _context.THUOCs
                .Include(t => t.TRUYEN_TRANH)
                .Include(t => t.THE_LOAI)
                .Select(t => new ThuocReadDTO
                {
                    MA_TRUYEN = t.MA_TRUYEN,
                    MA_THE_LOAI = t.MA_THE_LOAI,
                    TenTruyen = t.TRUYEN_TRANH.TEN_TRUYEN, // Giả sử TRUYEN_TRANH có thuộc tính Ten
                    TenTheLoai = t.THE_LOAI.TEN_THE_LOAI // Giả sử THE_LOAI có thuộc tính Ten
                })
                .ToListAsync();
        }

        public async Task<ThuocReadDTO> GetByIdAsync(int maTruyen, int maTheLoai)
        {
            var t = await _context.THUOCs
                .Include(tu => tu.TRUYEN_TRANH)
                .Include(tu => tu.THE_LOAI)
                .FirstOrDefaultAsync(tu => tu.MA_TRUYEN == maTruyen && tu.MA_THE_LOAI == maTheLoai);

            if (t == null)
                return null;

            return new ThuocReadDTO
            {
                MA_TRUYEN = t.MA_TRUYEN,
                MA_THE_LOAI = t.MA_THE_LOAI,
                TenTruyen = t.TRUYEN_TRANH.TEN_TRUYEN,
                TenTheLoai = t.THE_LOAI.TEN_THE_LOAI
            };
        }

        public async Task<bool> UpdateAsync(int maTruyen, int maTheLoai, ThuocUpdateDTO dto)
        {
            var thuoc = await _context.THUOCs.FindAsync(maTruyen, maTheLoai);
            if (thuoc == null)
                return false;

            // Nếu bạn muốn cập nhật khóa chính, bạn cần xóa và thêm mới
            // Tuy nhiên, trong nhiều trường hợp, khóa chính không nên thay đổi
            // Giả sử chúng ta không thay đổi khóa chính ở đây

            // Nếu có các thuộc tính khác cần cập nhật, hãy cập nhật chúng ở đây

            await _context.SaveChangesAsync();
            return true;
        }
    }
}
