// Controllers/ThuocController.cs
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Threading.Tasks;
using NewProject.Repository; // Thay thế bằng namespace thực tế của bạn
using NewProject.Models; // Thay thế bằng namespace thực tế của bạn
using NewProject.DTOs; // Thay thế bằng namespace thực tế của bạn

namespace NewProject.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ThuocController : ControllerBase
    {
        private readonly IThuocRepository _thuocRepository;

        public ThuocController(IThuocRepository thuocRepository)
        {
            _thuocRepository = thuocRepository;
        }

        // GET: api/Thuoc
        [HttpGet]
        public async Task<ActionResult<IEnumerable<ThuocReadDTO>>> GetThuoc()
        {
            var thuocs = await _thuocRepository.GetAllAsync();
            var thuocReadDTOs = new List<ThuocReadDTO>();

            foreach (var thuoc in thuocs)
            {
                var dto = new ThuocReadDTO
                {
                    MaTruyen = thuoc.MA_TRUYEN,
                    TenTruyen = thuoc.TRUYEN_TRANH?.TEN_TRUYEN,
                    MaTheLoai = thuoc.MA_THE_LOAI,
                    TenTheLoai = thuoc.THE_LOAI?.TEN_THE_LOAI
                };
                thuocReadDTOs.Add(dto);
            }

            return Ok(thuocReadDTOs);
        }

        // GET: api/Thuoc/{maTruyen}/{maTheLoai}
        [HttpGet("{maTruyen}/{maTheLoai}")]
        public async Task<ActionResult<ThuocReadDTO>> GetThuoc(int maTruyen, int maTheLoai)
        {
            var thuoc = await _thuocRepository.GetByIdAsync(maTruyen, maTheLoai);
            if (thuoc == null)
            {
                return NotFound();
            }

            var dto = new ThuocReadDTO
            {
                MaTruyen = thuoc.MA_TRUYEN,
                TenTruyen = thuoc.TRUYEN_TRANH?.TEN_TRUYEN,
                MaTheLoai = thuoc.MA_THE_LOAI,
                TenTheLoai = thuoc.THE_LOAI?.TEN_THE_LOAI
            };

            return Ok(dto);
        }

        // POST: api/Thuoc
        [HttpPost]
        public async Task<ActionResult<ThuocReadDTO>> CreateThuoc(ThuocCreateDTO thuocCreateDTO)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            // Kiểm tra sự tồn tại của association
            var exists = await _thuocRepository.ExistsAsync(thuocCreateDTO.MaTruyen, thuocCreateDTO.MaTheLoai);
            if (exists)
            {
                return Conflict("Association giữa TruyenTranh và TheLoai đã tồn tại.");
            }

            // Tạo đối tượng Thuoc từ DTO
            var thuoc = new THUOC
            {
                MA_TRUYEN = thuocCreateDTO.MaTruyen,
                MA_THE_LOAI = thuocCreateDTO.MaTheLoai
                // Nếu có thêm các thuộc tính khác, hãy thêm ở đây
            };

            await _thuocRepository.AddAsync(thuoc);

            // Lấy thông tin Thuoc vừa tạo để trả về DTO
            var createdThuoc = await _thuocRepository.GetByIdAsync(thuoc.MA_TRUYEN, thuoc.MA_THE_LOAI);

            var thuocReadDTO = new ThuocReadDTO
            {
                MaTruyen = createdThuoc.MA_TRUYEN,
                TenTruyen = createdThuoc.TRUYEN_TRANH?.TEN_TRUYEN,
                MaTheLoai = createdThuoc.MA_THE_LOAI,
                TenTheLoai = createdThuoc.THE_LOAI?.TEN_THE_LOAI
            };

            return CreatedAtAction(nameof(GetThuoc), new { maTruyen = thuoc.MA_TRUYEN, maTheLoai = thuoc.MA_THE_LOAI }, thuocReadDTO);
        }

        // PUT: api/Thuoc/{maTruyen}/{maTheLoai}
        [HttpPut("{maTruyen}/{maTheLoai}")]
        public async Task<IActionResult> UpdateThuoc(int maTruyen, int maTheLoai, ThuocUpdateDTO thuocUpdateDTO)
        {
            if (maTruyen != thuocUpdateDTO.MaTruyen || maTheLoai != thuocUpdateDTO.MaTheLoai)
            {
                return BadRequest("Mã Truyen hoặc Mã Thể Loại không khớp với đường dẫn.");
            }

            var exists = await _thuocRepository.ExistsAsync(maTruyen, maTheLoai);
            if (!exists)
            {
                return NotFound();
            }

            // Tạo đối tượng Thuoc từ DTO
            var thuocToUpdate = new THUOC
            {
                MA_TRUYEN = thuocUpdateDTO.MaTruyen,
                MA_THE_LOAI = thuocUpdateDTO.MaTheLoai
                // Nếu có thêm các thuộc tính khác để cập nhật, hãy thêm ở đây
            };

            await _thuocRepository.UpdateAsync(thuocToUpdate);

            return NoContent();
        }

        // DELETE: api/Thuoc/{maTruyen}/{maTheLoai}
        [HttpDelete("{maTruyen}/{maTheLoai}")]
        public async Task<IActionResult> DeleteThuoc(int maTruyen, int maTheLoai)
        {
            var exists = await _thuocRepository.ExistsAsync(maTruyen, maTheLoai);
            if (!exists)
            {
                return NotFound();
            }

            await _thuocRepository.DeleteAsync(maTruyen, maTheLoai);
            return NoContent();
        }
    }
}