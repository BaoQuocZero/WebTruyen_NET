using System.ComponentModel.DataAnnotations;

namespace NewProject.Models
{
    public class THUOC
    {
        public int MA_TRUYEN { get; set; }
        public int MA_THE_LOAI { get; set; }

        [Required]
        public TRUYEN_TRANH TRUYEN_TRANH { get; set; }
        [Required]
        public THE_LOAI THE_LOAI { get; set; }

      
    }
}
