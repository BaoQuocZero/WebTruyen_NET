﻿using Microsoft.AspNetCore.Http;
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
                        THE_LOAI = p.THUOCs.Select(s => s.THE_LOAI.TEN_THE_LOAI),
                        CHO_GIOI_TINH = p.THUOCs.Select(s => s.THE_LOAI.CHO_GIOI_TINH),
                        TAC_GIA = p.SANG_TACs.Select(s => s.TAC_GIA.TEN_TAC_GIA),
                        QUOC_GIA_TAC_GIA = p.SANG_TACs.Select(s => s.TAC_GIA.QUOC_GIA_TAC_GIA)
                    });

            return Ok(product_info);
        }

        [HttpPost]
        public async Task<IActionResult> PostTruyenTranh(TRUYEN_TRANH_DTOs truyen_tranh_DTOs)
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
                await _itruyentranhRepository.AddNew(newTruyenTranh);

               

                var newSangTac = new SANG_TAC
                {
                    MA_TAC_GIA = truyen_tranh_DTOs.MA_TAC_GIA,
                    MA_TRUYEN = newTruyenTranh.MA_TRUYEN
                };
                await _sangtacRepository.AddNew(newSangTac);


                var newThuoc = new THUOC
                {
                    MA_THE_LOAI = truyen_tranh_DTOs.MA_THE_LOAI,
                    MA_TRUYEN = newTruyenTranh.MA_TRUYEN
                };
                await _thuocRepository.AddNew(newThuoc);



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
                        THE_LOAI = p.THUOCs.Select(s => s.THE_LOAI.TEN_THE_LOAI),
                        CHO_GIOI_TINH = p.THUOCs.Select(s => s.THE_LOAI.CHO_GIOI_TINH),
                        TAC_GIA = p.SANG_TACs.Select(s => s.TAC_GIA.TEN_TAC_GIA),
                        QUOC_GIA_TAC_GIA = p.SANG_TACs.Select(s => s.TAC_GIA.QUOC_GIA_TAC_GIA)
                    });

            var sangtac = await _context.SANG_TACs.FirstOrDefaultAsync(x => x.MA_TRUYEN == id);

            return Ok(sangtac);
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



            _itruyentranhRepository.UpdateWithId(truyentranh);
          
            return Ok("đã thay đổi thành công");
        }




        [HttpDelete("id")]
        public async Task<IActionResult> DeleteByIdTruyenTranh(int id)
        {

            var sangtacs = await _context.SANG_TACs
                                   .Where(s => s.MA_TRUYEN == id ) // Thay đổi điều kiện theo cấu trúc của bạn
                                   .ToListAsync();
            foreach (var sangtac in sangtacs)
            {
                _sangtacRepository.DeleteWithId(sangtac);
            }

           
            var thuocs = await _context.THUOCs
                                   .Where(s => s.MA_TRUYEN == id) // Thay đổi điều kiện theo cấu trúc của bạn
                                   .ToListAsync();
            foreach (var thuoc in thuocs)
            {
                _thuocRepository.DeleteWithId(thuoc);
            }
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
