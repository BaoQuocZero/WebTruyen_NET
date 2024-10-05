using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using NewProject.Data;
using NewProject.DTOs;
using NewProject.Models;
using NewProject.Repository;
namespace NewProject.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TheLoaiController : ControllerBase
    {
        private readonly MyDbContext _context;
        private readonly ITheLoaiRepository _ITheLoaiRepository;
        public TheLoaiController(MyDbContext context, ITheLoaiRepository ITheLoaiRepository)
        {
            _context = context;
            _ITheLoaiRepository = ITheLoaiRepository;
        }
        [HttpGet]
        public async Task<IActionResult> GetAllTheLoai()
        {
            return Ok(await _ITheLoaiRepository.GetAll());
        }
        [HttpGet("id")]
        public async Task<IActionResult> GetByIdTheLoai(int id)
        {
            var TheLoai = await _ITheLoaiRepository.GetById(id);
            if (TheLoai == null)
            {
                return BadRequest();
            }
            return Ok(TheLoai);
        }
        [HttpPost]
        public IActionResult PostTheLoai(THE_LOAI_DTOs _THE_LOAI_DTOs)
        {
            var TheLoai = _context.THE_LOAIs.FirstOrDefault(x => x.TEN_THE_LOAI == _THE_LOAI_DTOs.TEN_THE_LOAI);
            if (TheLoai == null)
            {
                var newTheLoai = new THE_LOAI
                {
                    TEN_THE_LOAI = _THE_LOAI_DTOs.TEN_THE_LOAI,
                    CHO_GIOI_TINH = _THE_LOAI_DTOs.CHO_GIOI_TINH
                };
                _ITheLoaiRepository.AddNew(newTheLoai);
                return Ok("The loai moi la " + newTheLoai);
            }
            return BadRequest("The loai nay da ton tai");
        }
        [HttpPut("id")]
        public async Task<IActionResult> PutByIdTheLoai(int id, THE_LOAI_DTOs tHE_LOAI_DTOs)
        {
            var TheLoai = await _ITheLoaiRepository.GetById(id);
            if (TheLoai == null)
            {
                return BadRequest("không tìm thấy tác giả");
            }
            TheLoai.TEN_THE_LOAI = tHE_LOAI_DTOs.TEN_THE_LOAI;
            _ITheLoaiRepository.UpdateWithId(TheLoai);
            return Ok("đã thay đổi thành công");
        }
        [HttpDelete("id")]
        public async Task<IActionResult> DeleteByIdTacGia(int id)
        {
            var TheLoai = await _ITheLoaiRepository.GetById(id);
            if (TheLoai == null)
            {
                return BadRequest();
            }
            _ITheLoaiRepository.DeleteWithId(TheLoai);
            return Ok();
        }
    }
}