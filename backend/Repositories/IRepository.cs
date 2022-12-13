using Microsoft.EntityFrameworkCore;

using Hermes.DataAccess;
using Hermes.Models;

namespace Hermes.Repositories
{
    public interface IRepository
    {
        DataContext DbContext { get; }
        IUserRepository User { get; }
        int Save();
        Task<int> SaveAsync();
    }
}
