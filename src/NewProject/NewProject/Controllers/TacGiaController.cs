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
    public class TacGiaController : ControllerBase
    {
        private readonly MyDbContext _context;
        private readonly ItacgiaRepository _itacgiaRepository;
        private readonly ISangtacRepository _satacRepository;
        public TacGiaController(MyDbContext context, ItacgiaRepository itacgiaRepository, ISangtacRepository sangtacRepository) 
        {
            _context = context;
            _itacgiaRepository = itacgiaRepository;
            _satacRepository = sangtacRepository;
        }

        [HttpGet]
        public async Task<IActionResult> GetAllTacGia() 
        {
            return Ok(await _itacgiaRepository.GetAll());
        }

        [HttpPost]
        public async Task<IActionResult> PostTacGia(TAC_GIA_DTOs tAC_GIA_DTOs) 
        {
            var tacgia = _context.TAC_GIAs.FirstOrDefault(x => x.TEN_TAC_GIA == tAC_GIA_DTOs.TEN_TAC_GIA);
            if (tacgia == null)
            {
                var newTacgia = new TAC_GIA
                {

                    TEN_TAC_GIA = tAC_GIA_DTOs.TEN_TAC_GIA,
                    GIOI_TINH_TAC_GIA = tAC_GIA_DTOs.GIOI_TINH_TAC_GIA,
                    QUOC_GIA_TAC_GIA = tAC_GIA_DTOs.QUOC_GIA_TAC_GIA
                };
               await  _itacgiaRepository.AddNew(newTacgia);
                return Ok("tac gia moi la "+ newTacgia.TEN_TAC_GIA);
            }
            return BadRequest("tac gia nay da ton tai");
        }


        [HttpGet("id")]
        public async Task<IActionResult> GetByIdTacGia(int id)
        {
            var tacgia = await _itacgiaRepository.GetById(id);
            if(tacgia == null)
            {
                return BadRequest();
            }


            return Ok(tacgia);
        }



        [HttpPut("id")]
        public async Task<IActionResult> PutByIdTacGia(int id,TAC_GIA_DTOs tacgiaDTO)
        {
            var tacgia = await _itacgiaRepository.GetById(id);
            if (tacgia == null)
            {
                return BadRequest("không tìm thấy tác giả");
            }

            //cách 1

            //_context.Entry(tacgia).CurrentValues.SetValues(tacgiaDTO);
            //_context.Entry(tacgia).State = EntityState.Modified;
            //_context.SaveChanges();




            //cách 2
            tacgia.TEN_TAC_GIA = tacgiaDTO.TEN_TAC_GIA;
            tacgia.GIOI_TINH_TAC_GIA = tacgiaDTO.GIOI_TINH_TAC_GIA;
            tacgia.QUOC_GIA_TAC_GIA = tacgiaDTO.QUOC_GIA_TAC_GIA;

            _itacgiaRepository.UpdateWithId(tacgia);

            return Ok("đã thay đổi thành công");
        }




        [HttpDelete("id")]
        public async Task<IActionResult> DeleteByIdTacGia(int id)
        {
            var tacgia = await _itacgiaRepository.GetById(id);
            if (tacgia == null)
            {
                return BadRequest();
            }


            var sangtacAll = await _context.SANG_TACs
                                   .Where(s => s.MA_TAC_GIA == id) // Thay đổi điều kiện theo cấu trúc của bạn
                                   .ToListAsync();
            foreach (var sangtac in sangtacAll)
            {
                _satacRepository.DeleteWithId(sangtac);
            }

            
            
             _itacgiaRepository.DeleteWithId(tacgia);
            return Ok();
        }       

    }
}
