using NewProject.Data;
using NewProject.Models;

namespace NewProject.Repository
{
    public class TruyentranhRepository : RepositoryGeneric<TRUYEN_TRANH>, ITruyentranhRepository
    {
        public TruyentranhRepository(MyDbContext context) : base(context)
        {

        }
    }
}
