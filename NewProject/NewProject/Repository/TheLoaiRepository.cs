using NewProject.Data;
using NewProject.Models;

namespace NewProject.Repository
{
    public class TheLoaiRepository : RepositoryGeneric<THE_LOAI>, ITheLoaiRepository
    {
        public TheLoaiRepository(MyDbContext context) : base(context)
        {
        }
    }
}
