using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using NewProject.Data;
using NewProject.DTOs;
using NewProject.Models;
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
        public TruyenTranhController(MyDbContext context, ITruyentranhRepository itruyentranhRepository)
        {
            _context = context;
            _itruyentranhRepository = itruyentranhRepository;
        }

        [HttpGet]
        public async Task<IActionResult> getAllTruyenTranh()
        {
            return Ok(await _itruyentranhRepository.GetAll());
        }

        [HttpPost]
        public IActionResult PostTruyenTranh(TRUYEN_TRANH_DTOs truyen_tranh_DTOs)
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
                _itruyentranhRepository.AddNew(newTruyenTranh);
                return Ok("Truyen tranh moi la " + newTruyenTranh);
            }
            return BadRequest("Truyen tranh nay da ton tai");
        }


        [HttpGet("id")]
        public async Task<IActionResult> GetByIdTruyenTranh(int id)
        {
            var truyentranh = await _itruyentranhRepository.GetById(id);
            if (truyentranh == null)
            {
                return BadRequest();
            }


            return Ok(truyentranh);
        }



        [HttpPut("id")]
        public async Task<IActionResult> PutByIdTruyenTranh(int id, TRUYEN_TRANH_DTOs truyentranhDTOs)
        {
            var truyentranh = await _itruyentranhRepository.GetById(id);
            if (truyentranh == null)
            {
                return BadRequest("không tìm thấy truyện");
            }

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

            _itruyentranhRepository.UpdateWithId(truyentranh);

            return Ok("đã thay đổi thành công");
        }




        [HttpDelete("id")]
        public async Task<IActionResult> DeleteByIdTruyenTranh(int id)
        {
            var truyentranh = await _itruyentranhRepository.GetById(id);
            if (truyentranh == null)
            {
                return BadRequest();
            }


            _itruyentranhRepository.DeleteWithId(truyentranh);
            return Ok();
        }

    }
}
