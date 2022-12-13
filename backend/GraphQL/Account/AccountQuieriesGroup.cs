using GraphQL.Types;

using Hermes.Models;
using Hermes.Repositories;
using Hermes.Services;

namespace Hermes.GraphQL
{
    public class AccountQuieriesGroup : ObjectGraphType
    {
        public AccountQuieriesGroup(Defer<IRepository> repository, Defer<IAuthenticationService> authService)
        {
            Field<UserType, User>(Name = "currentUser")
                .ResolveAsync(async (context) =>
                {
                    string username = authService.Value.GetUserName();
                    return await repository.Value.User.GetByUsername(username);
                });
        }
    }
}
