using System.Collections.Concurrent;

namespace Hermes.Helpers
{
    public interface IEventMessageStack
    {
        IObservable<EventMessage> GetEventMessageSubject();
        EventMessage AddEventMessage(EventMessage eventMessage);
    }
}
