using System;

using GraphQL.Types;
using GraphQL.Instrumentation;

using Hermes.Services;

namespace Hermes.GraphQL
{
    public class HermesSchema : Schema
    {
        public HermesSchema(IServiceProvider provider, Defer<IAuthenticationService> authService) : base(provider)
        {
            Query = provider.GetRequiredService<HermesQueries>();
            Mutation = provider.GetRequiredService<HermesMutations>();
            Subscription = provider.GetRequiredService<HermesSubscriptions>();

            FieldMiddleware.Use(new HermesMiddleware(authService));
        }
    }
}
