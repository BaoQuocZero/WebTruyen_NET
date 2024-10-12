// Controllers/ThuocController.cs
using Microsoft.AspNetCore.Mvc;
using NewProject.DTOs;
using NewProject.Repositories;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace NewProject.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ThuocController : ControllerBase
    {
        private readonly IThuocRepository _repository;

        public ThuocController(IThuocRepository repository)
        {
            _repository = repository;
        }

        // GET: api/Thuoc
        [HttpGet]
        public async Task<ActionResult<IEnumerable<ThuocReadDTO>>> GetAll()
        {
            var thuocs = await _repository.GetAllAsync();
            return Ok(thuocs);
        }

        // GET: api/Thuoc/{maTruyen}/{maTheLoai}
        [HttpGet("{maTruyen}/{maTheLoai}")]
        public async Task<ActionResult<ThuocReadDTO>> GetById(int maTruyen, int maTheLoai)
        {
            var thuoc = await _repository.GetByIdAsync(maTruyen, maTheLoai);
            if (thuoc == null)
                return NotFound();

            return Ok(thuoc);
        }

        // POST: api/Thuoc
        [HttpPost]
        public async Task<ActionResult<ThuocReadDTO>> Create(ThuocCreateDTO dto)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var createdThuoc = await _repository.CreateAsync(dto);
            return CreatedAtAction(nameof(GetById), new { maTruyen = createdThuoc.MA_TRUYEN, maTheLoai = createdThuoc.MA_THE_LOAI }, createdThuoc);
        }

        // PUT: api/Thuoc/{maTruyen}/{maTheLoai}
        [HttpPut("{maTruyen}/{maTheLoai}")]
        public async Task<IActionResult> Update(int maTruyen, int maTheLoai, ThuocUpdateDTO dto)
        {
            if (maTruyen != dto.MA_TRUYEN || maTheLoai != dto.MA_THE_LOAI)
                return BadRequest("Key mismatch");

            var result = await _repository.UpdateAsync(maTruyen, maTheLoai, dto);
            if (!result)
                return NotFound();

            return NoContent();
        }

        // DELETE: api/Thuoc/{maTruyen}/{maTheLoai}
        [HttpDelete("{maTruyen}/{maTheLoai}")]
        public async Task<IActionResult> Delete(int maTruyen, int maTheLoai)
        {
            var result = await _repository.DeleteAsync(maTruyen, maTheLoai);
            if (!result)
                return NotFound();

            return NoContent();
        }
    }
}