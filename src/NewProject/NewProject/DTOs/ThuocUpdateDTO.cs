// DTOs/ThuocUpdateDTO.cs
using System.ComponentModel.DataAnnotations;

namespace NewProject.DTOs
{
    public class ThuocUpdateDTO
    {
        [Required(ErrorMessage = "MaTruyen là bắt buộc.")]
        public int MaTruyen { get; set; }

        [Required(ErrorMessage = "MaTheLoai là bắt buộc.")]
        public int MaTheLoai { get; set; }

        // Nếu có thêm các thuộc tính khác để cập nhật, hãy thêm ở đây
    }
}
