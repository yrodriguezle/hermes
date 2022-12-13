using Hermes.Models;

namespace Hermes.Repositories
{
    public interface IUserRepository : IRepositoryBase<User>
    {
        Task<User?> GetByUsername(string username);
    }
}
