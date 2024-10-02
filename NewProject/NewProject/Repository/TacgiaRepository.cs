using NewProject.Data;
using NewProject.Models;

namespace NewProject.Repository
{
    public class TacgiaRepository : RepositoryGeneric<TAC_GIA>, ItacgiaRepository
    {
        public TacgiaRepository(MyDbContext context) : base(context)
        {
        }
    }
}
