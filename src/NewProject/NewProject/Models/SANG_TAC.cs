using System.ComponentModel.DataAnnotations;

namespace NewProject.Models
{
    public class SANG_TAC
    {
        public int MA_TAC_GIA {  get; set; }
        public int MA_TRUYEN { get; set; }

        [Required]
        public TRUYEN_TRANH TRUYEN_TRANH { get; set; }
        [Required]
        public TAC_GIA TAC_GIA { get; set; }
    }
}
