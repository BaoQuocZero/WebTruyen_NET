namespace NewProject.Repository
{
    public interface IRepository<T> where T : class
    {
        Task<IEnumerable<T>> GetAll();
        Task<T> GetById(int id);
        Task<T> AddNew(T entity);
        void UpdateWithId(T entity);
        void DeleteWithId(T entity);
    }
}
