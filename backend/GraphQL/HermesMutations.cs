using GraphQL.Types;

namespace Hermes.GraphQL
{
    public class HermesMutations : ObjectGraphType
    {
        public HermesMutations()
        {
            Field<AccountMutationsGroup>("account").Resolve(context => new { });
        }
    }
}
