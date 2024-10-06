using System.ComponentModel.DataAnnotations;

namespace NewProject.Models
{
    public class TAC_GIA
    {
        [Key]
        public int MA_TAC_GIA { get; set; }

        [Required]
        public string TEN_TAC_GIA {  get; set; }
        public string GIOI_TINH_TAC_GIA { get; set; }
        public string QUOC_GIA_TAC_GIA { get; set; }
        public ICollection<SANG_TAC> SANG_TACs { get; set; }
    }
}
