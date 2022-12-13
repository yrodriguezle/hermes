using System.Collections.Concurrent;

namespace Hermes.Helpers
{
    public interface IEventMessageStack
    {
        IObservable<EventMessage> GetAll();
        EventMessage AddEventMessage(EventMessage eventMessage);
        ConcurrentStack<EventMessage> AllEventMessages { get; }
    }
}
