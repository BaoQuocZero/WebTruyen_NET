using System.ComponentModel.DataAnnotations;

namespace NewProject.Models
{
    public class THE_LOAI
    {
        [Key]
        public int MA_THE_LOAI { get; set; }

        [Required]
        public string TEN_THE_LOAI {  set; get; }
        public string CHO_GIOI_TINH {  set; get; }

        [Required]
        public int MA_TRUYEN { set; get; }
        public TRUYEN_TRANH TRUYEN_TRANHs { get; set; }
    }
}
