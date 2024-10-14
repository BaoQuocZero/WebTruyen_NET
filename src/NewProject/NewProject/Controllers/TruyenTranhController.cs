//TruyenTranhController.cs
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using NewProject.Data;
using NewProject.DTOs;
using NewProject.Models;
using NewProject.Repositories;
using NewProject.Repository;
using System.Threading.Tasks;

namespace NewProject.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TruyenTranhController : ControllerBase
    {
        private readonly MyDbContext _context;
        private readonly ITruyentranhRepository _itruyentranhRepository;
        private readonly ISangtacRepository _sangtacRepository;
        private readonly IThuocRepository _thuocRepository;
        public TruyenTranhController(MyDbContext context, ITruyentranhRepository itruyentranhRepository, ISangtacRepository sangtacRepository, IThuocRepository thuocRepository)
        {
            _context = context;
            _itruyentranhRepository = itruyentranhRepository;
            _sangtacRepository = sangtacRepository;
            _thuocRepository = thuocRepository;
        }

        [HttpGet]
        public async Task<IActionResult> getAllTruyenTranh()
        {

            var product_info = _context.TRUYEN_TRANHs
                    .Include(p => p.THUOCs)
                        .ThenInclude(s => s.THE_LOAI)
                    .Include(p => p.SANG_TACs)
                        .ThenInclude(s => s.TAC_GIA)
                    .Select(p => new
                    {
                        MA_TRUYEN = p.MA_TRUYEN,
                        TEN_TRUYEN = p.TEN_TRUYEN,
                        NOI_DUNG = p.NOI_DUNG_TRUYEN,
                        TINH_TRANG = p.TINH_TRANG,
                        MO_TA_TRUYEN = p.MO_TA_TRUYEN,
                        ANH_BIA = p.ANH_BIA,
                        GHI_CHU_TRUYEN = p.GHI_CHU_TRUYEN,
                        THE_LOAI = p.THUOCs.Select(s => s.THE_LOAI.TEN_THE_LOAI),
                        MA_THE_LOAI = p.THUOCs.Select(s => s.THE_LOAI.MA_THE_LOAI),
                        CHO_GIOI_TINH = p.THUOCs.Select(s => s.THE_LOAI.CHO_GIOI_TINH),
                        TAC_GIA = p.SANG_TACs.Select(s => s.TAC_GIA.TEN_TAC_GIA),
                        MA_TAC_GIA = p.SANG_TACs.Select(s => s.TAC_GIA.MA_TAC_GIA),
                        QUOC_GIA_TAC_GIA = p.SANG_TACs.Select(s => s.TAC_GIA.QUOC_GIA_TAC_GIA)
                    });

            return Ok(product_info);
        }

        [HttpGet("tacgia/{maTacGia}")]
        public async Task<IActionResult> GetTruyenTranhByAuthor(int maTacGia)
        {
            var truyenTranh = await _context.TRUYEN_TRANHs
                .Include(p => p.SANG_TACs)
                .ThenInclude(s => s.TAC_GIA)
                .Include(p => p.THUOCs)
                .ThenInclude(t => t.THE_LOAI)
                .Where(p => p.SANG_TACs.Any(s => s.MA_TAC_GIA == maTacGia))
                .Select(p => new
                {
                    TEN_TRUYEN = p.TEN_TRUYEN,
                    ANH_BIA = p.ANH_BIA,
                    NOI_DUNG_TRUYEN = p.NOI_DUNG_TRUYEN,
                    TINH_TRANG = p.TINH_TRANG,
                    MO_TA_TRUYEN = p.MO_TA_TRUYEN,
                    GHI_CHU_TRUYEN = p.GHI_CHU_TRUYEN,
                    THE_LOAI = p.THUOCs.Select(t => t.THE_LOAI.TEN_THE_LOAI),
                    CHO_GIOI_TINH = p.THUOCs.Select(t => t.THE_LOAI.CHO_GIOI_TINH),
                    MA_THE_LOAI = p.THUOCs.Select(t => t.THE_LOAI.MA_THE_LOAI).FirstOrDefault(),
                    MA_TAC_GIA = p.SANG_TACs.Select(s => s.TAC_GIA.MA_TAC_GIA).FirstOrDefault()
                }).ToListAsync();

            if (!truyenTranh.Any())
            {
                return NotFound(new { message = "Không tìm thấy truyện tranh của tác giả này." });
            }

            return Ok(truyenTranh);
        }

        [HttpPost]
        public async Task<IActionResult> PostTruyenTranh(truyentranhCreateDTO truyen_tranh_DTOs)
        {
            var truyentranh = _context.TRUYEN_TRANHs.FirstOrDefault(x => x.TEN_TRUYEN == truyen_tranh_DTOs.TEN_TRUYEN);


            if (truyentranh == null)
            {
                var newTruyenTranh = new TRUYEN_TRANH
                {

                    TEN_TRUYEN = truyen_tranh_DTOs.TEN_TRUYEN,
                    ANH_BIA = truyen_tranh_DTOs.ANH_BIA,
                    NOI_DUNG_TRUYEN = truyen_tranh_DTOs.NOI_DUNG_TRUYEN,
                    TINH_TRANG = truyen_tranh_DTOs.TINH_TRANG,
                    MO_TA_TRUYEN = truyen_tranh_DTOs.MO_TA_TRUYEN,
                    GHI_CHU_TRUYEN = truyen_tranh_DTOs.GHI_CHU_TRUYEN
                };
                await _itruyentranhRepository.AddNewAsync(newTruyenTranh);



                var newSangTac = new SANG_TAC
                {
                    MA_TAC_GIA = truyen_tranh_DTOs.MA_TAC_GIA,
                    MA_TRUYEN = newTruyenTranh.MA_TRUYEN
                };
                await _sangtacRepository.AddNewAsync(newSangTac);


                var newThuoc = new ThuocCreateDTO
                {
                    MA_THE_LOAI = truyen_tranh_DTOs.MA_THE_LOAI,
                    MA_TRUYEN = newTruyenTranh.MA_TRUYEN
                };
                await _thuocRepository.CreateAsync(newThuoc);



                return Ok("Truyen tranh moi la");
            }
            return BadRequest("Truyen tranh nay da ton tai");
        }


        [HttpGet("id")]
        public async Task<IActionResult> GetByIdTruyenTranh(int id)
        {
       
            var product_info = _context.TRUYEN_TRANHs
                    .Include(p => p.THUOCs)
                        .ThenInclude(s=>s.THE_LOAI)
                    .Include(p => p.SANG_TACs)
                        .ThenInclude(s => s.TAC_GIA)
                    .Where(p => p.MA_TRUYEN == id)
                    .Select(p => new
                    {
                        MA_TRUYEN = p.MA_TRUYEN,
                        TEN_TRUYEN = p.TEN_TRUYEN,
                        NOI_DUNG = p.NOI_DUNG_TRUYEN,
                        TINH_TRANG = p.TINH_TRANG,
                        MO_TA_TRUYEN = p.MO_TA_TRUYEN,
                        ANH_BIA = p.ANH_BIA,
                        GHI_CHU_TRUYEN = p.GHI_CHU_TRUYEN,
                        THE_LOAI = p.THUOCs.Select(s => s.THE_LOAI.TEN_THE_LOAI),
                        MA_THE_LOAI = p.THUOCs.Select(s => s.THE_LOAI.MA_THE_LOAI),
                        CHO_GIOI_TINH = p.THUOCs.Select(s => s.THE_LOAI.CHO_GIOI_TINH),
                        TAC_GIA = p.SANG_TACs.Select(s => s.TAC_GIA.TEN_TAC_GIA),
                        MA_TAC_GIA = p.SANG_TACs.Select(s => s.TAC_GIA.MA_TAC_GIA),
                        QUOC_GIA_TAC_GIA = p.SANG_TACs.Select(s => s.TAC_GIA.QUOC_GIA_TAC_GIA)
                    });

            var sangtac = await _context.SANG_TACs.FirstOrDefaultAsync(x => x.MA_TRUYEN == id);

            return Ok(product_info);
        }



        [HttpPut("id")]
        public async Task<IActionResult> PutByIdTruyenTranh(int id, TRUYEN_TRANH_DTOs truyentranhDTOs)
        {
            var truyentranh = await _context.TRUYEN_TRANHs.FirstOrDefaultAsync(p => p.MA_TRUYEN == id);
            //cách 1
            //_context.Entry(tacgia).CurrentValues.SetValues(tacgiaDTO);
            //_context.Entry(tacgia).State = EntityState.Modified;
            //_context.SaveChanges();
            //cách 2

            truyentranh.TEN_TRUYEN = truyentranhDTOs.TEN_TRUYEN;
            truyentranh.ANH_BIA = truyentranhDTOs.ANH_BIA;
            truyentranh.NOI_DUNG_TRUYEN = truyentranhDTOs.NOI_DUNG_TRUYEN;
            truyentranh.TINH_TRANG = truyentranhDTOs.TINH_TRANG;
            truyentranh.MO_TA_TRUYEN = truyentranhDTOs.MO_TA_TRUYEN;
            truyentranh.GHI_CHU_TRUYEN = truyentranhDTOs.GHI_CHU_TRUYEN;
            var sangtac = await _context.SANG_TACs.FirstOrDefaultAsync(x => x.MA_TRUYEN == id && x.MA_TAC_GIA == truyentranhDTOs.OLD_MA_TAC_GIA);
            if (sangtac != null && sangtac.MA_TAC_GIA != truyentranhDTOs.MA_TAC_GIA)
            {
                // Xóa thực thể hiện tại
                _context.SANG_TACs.Remove(sangtac);
                await _context.SaveChangesAsync();

                // Tạo một thực thể mới với MA_TAC_GIA mới
                var newSangTac = new SANG_TAC
                {
                    MA_TRUYEN = id,
                    MA_TAC_GIA = truyentranhDTOs.MA_TAC_GIA
                    // Cần gán các thuộc tính khác nếu có
                };
                await _context.SANG_TACs.AddAsync(newSangTac);
            }

            var thuoc = await _context.THUOCs.FirstOrDefaultAsync(x => x.MA_TRUYEN == id && x.MA_THE_LOAI == truyentranhDTOs.OLD_MA_THE_LOAI);
            if (thuoc != null && thuoc.MA_THE_LOAI != truyentranhDTOs.MA_THE_LOAI)
            {
                _context.THUOCs.Remove(thuoc);
                await _context.SaveChangesAsync();

                // Tạo một thực thể mới với MA_TAC_GIA mới
                var newThuoc = new THUOC
                {
                    MA_TRUYEN = id,
                    MA_THE_LOAI = truyentranhDTOs.MA_THE_LOAI
                    // Cần gán các thuộc tính khác nếu có
                };
                await _context.THUOCs.AddAsync(newThuoc);
            }



            _itruyentranhRepository.UpdateWithIdAsync(truyentranh);
          
            return Ok("đã thay đổi thành công");
        }


        [HttpDelete("delete/{id}")]
        public async Task<IActionResult> DeleteByIdTruyenTranh(int id)
        {
            using var transaction = await _context.Database.BeginTransactionAsync();

            try
            {
                // Xóa SANG_TACs liên quan
                var sangtacs = await _context.SANG_TACs
                                       .Where(s => s.MA_TRUYEN == id)
                                       .ToListAsync();

                foreach (var sangtac in sangtacs)
                {
                    await _sangtacRepository.DeleteWithIdAsync(sangtac); // Đảm bảo phương thức hỗ trợ async
                }

                // Xóa THUOCs liên quan
                var thuocs = await _context.THUOCs
                                       .Where(s => s.MA_TRUYEN == id)
                                       .ToListAsync();

                foreach (var thuoc in thuocs)
                {
                    var result = await _thuocRepository.DeleteAsync(thuoc.MA_TRUYEN, thuoc.MA_THE_LOAI);
                    if (!result)
                    {
                        // Xử lý nếu xóa thất bại
                        return StatusCode(StatusCodes.Status500InternalServerError, "Error deleting Thuoc.");
                    }
                }

                // Lấy và xóa TRUYEN_TRANH
                var truyentranh = await _itruyentranhRepository.GetByIdAsync(id);
                if (truyentranh == null)
                {
                    return NotFound();
                }

                await _itruyentranhRepository.DeleteWithIdAsync(truyentranh); // Đảm bảo phương thức hỗ trợ async

                // Commit giao dịch
                await transaction.CommitAsync();
                return Ok();
            }
            catch (Exception ex)
            {
                // Rollback giao dịch trong trường hợp có lỗi
                await transaction.RollbackAsync();
                // Ghi log lỗi nếu cần
                return StatusCode(StatusCodes.Status500InternalServerError, $"Internal server error: {ex.Message}");
            }
        }

    }
}
