// Models/Thuoc.cs
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace NewProject.Models
{
    public class THUOC
    {
        public int MA_TRUYEN { get; set; }
        public int MA_THE_LOAI { get; set; }

        [ForeignKey("MA_TRUYEN")]
        public TRUYEN_TRANH TRUYEN_TRANH { get; set; }

        [ForeignKey("MA_THE_LOAI")]
        public THE_LOAI THE_LOAI { get; set; }
    }
}
