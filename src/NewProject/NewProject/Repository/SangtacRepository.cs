using NewProject.Data;
using NewProject.Models;

namespace NewProject.Repository
{
    public class SangtacRepository : RepositoryGeneric<SANG_TAC>, ISangtacRepository
    {
        public SangtacRepository(MyDbContext context) : base(context)
        {
        }
    }
}
