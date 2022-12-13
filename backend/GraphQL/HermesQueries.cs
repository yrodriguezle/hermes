using GraphQL.Types;

namespace Hermes.GraphQL
{
    public class HermesQueries : ObjectGraphType
    {
        public HermesQueries()
        {
            Field<AccountQuieriesGroup>("account").Resolve(context => new { });
        }
    }
}
