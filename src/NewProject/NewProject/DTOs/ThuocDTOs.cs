using System.ComponentModel.DataAnnotations;

namespace NewProject.DTOs
{
    public class ThuocCreateDTO
    {
        [Required]
        public int MA_TRUYEN { get; set; }

        [Required]
        public int MA_THE_LOAI { get; set; }
    }

    public class ThuocUpdateDTO
    {
        [Required]
        public int MA_TRUYEN { get; set; }

        [Required]
        public int MA_THE_LOAI { get; set; }
    }

    public class ThuocReadDTO
    {
        public int MA_TRUYEN { get; set; }
        public int MA_THE_LOAI { get; set; }

        // Thêm các thông tin liên quan nếu cần
        public string TenTruyen { get; set; }
        public string TenTheLoai { get; set; }
    }
}