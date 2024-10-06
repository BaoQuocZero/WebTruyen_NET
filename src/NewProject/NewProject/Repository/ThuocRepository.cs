using NewProject.Data;
using NewProject.Models;

namespace NewProject.Repository
{
    public class ThuocRepository : RepositoryGeneric<THUOC>, IThuocRepository
    {
        public ThuocRepository(MyDbContext context) : base(context)
        {
        }
    }
}
