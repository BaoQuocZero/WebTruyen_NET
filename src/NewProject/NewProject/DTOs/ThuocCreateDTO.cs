// DTOs/ThuocCreateDTO.cs
using System.ComponentModel.DataAnnotations;

namespace NewProject.DTOs
{
    public class ThuocCreateDTO
    {
        [Required(ErrorMessage = "MaTruyen là bắt buộc.")]
        public int MaTruyen { get; set; }

        [Required(ErrorMessage = "MaTheLoai là bắt buộc.")]
        public int MaTheLoai { get; set; }
    }
}
