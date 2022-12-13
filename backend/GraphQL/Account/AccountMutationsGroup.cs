using System.Security.Claims;

using GraphQL;
using GraphQL.DataLoader;
using GraphQL.Types;

using Hermes.Helpers;
using Hermes.Models;
using Hermes.Repositories;
using Hermes.Services;

namespace Hermes.GraphQL
{
    public class AccountMutationsGroup : ObjectGraphType
    {
        public AccountMutationsGroup(Defer<IRepository> repository, IEventMessageStack eventMessagesStack)
        {
            Field<UserType>(Name = "AddOrUpdateUser")
                .Argument<NonNullGraphType<UserInputType>>("user")
                .ResolveAsync(async context =>
                {
                    User userFromClient = context.GetArgument<User>("user");
                    User user = await repository.Value.User.AddOrUpdate(userFromClient);
                    eventMessagesStack.AddEventMessage(new EventMessage
                    {
                        Id = Guid.NewGuid().ToString(),
                        Entity = user,
                        SubscriptionName = "userChanged",
                    });
                    return user;
                });
        }
    }
}
