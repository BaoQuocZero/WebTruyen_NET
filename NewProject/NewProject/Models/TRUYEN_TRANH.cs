using System.ComponentModel.DataAnnotations;

namespace NewProject.Models
{
    public class TRUYEN_TRANH
    {
        [Key]
        public int MA_TRUYEN { get; set; }

        [Required]
        public string TEN_TRUYEN { get; set; }
        public string ANH_BIA  { get; set; }
        public string NOI_DUNG_TRUYEN { get; set; }

        public string TINH_TRANG {  get; set; }
        public string MO_TA_TRUYEN { get; set; }
        public string GHI_CHU_TRUYEN { get; set; }
        //public ICollection<THE_LOAI> THE_LOAIs { get; set; }
        public ICollection<SANG_TAC> SANG_TACs { get; set; }
        public ICollection<THUOC> THUOCs { get; set; }
    }
}
