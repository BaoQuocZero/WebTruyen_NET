using System.ComponentModel.DataAnnotations;

namespace NewProject.Models
{
    public class TRUYEN_TRANH
    {
        [Key]
        public int MA_TRUYEN { get; set; }

        [Required]
        [StringLength(5000)]
        public string TEN_TRUYEN { get; set; }

        [StringLength(5000)]
        public string ANH_BIA { get; set; }

        [StringLength(5000)]
        public string NOI_DUNG_TRUYEN { get; set; }

        [StringLength(50)]
        public string TINH_TRANG { get; set; }

        [StringLength(5000)]
        public string MO_TA_TRUYEN { get; set; }

        [StringLength(5000)]
        public string GHI_CHU_TRUYEN { get; set; }

        // Navigation Properties
        public ICollection<SANG_TAC> SANG_TACs { get; set; }
        public ICollection<THUOC> THUOCs { get; set; }
    }
}
