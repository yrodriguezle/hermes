
using System.Reactive.Linq;
using System.Reactive.Subjects;
using System.Collections.Concurrent;

namespace Hermes.Helpers
{
    public class EventMessageStack : IEventMessageStack
    {
        private readonly ISubject<EventMessage> _messageStream = new ReplaySubject<EventMessage>(1);
        public ConcurrentStack<EventMessage> AllEventMessages { get; }
        public EventMessageStack()
        {
            AllEventMessages = new ConcurrentStack<EventMessage>();
        }

        public IObservable<EventMessage> GetAll()
        {
            return _messageStream.Select(entity =>
            {
                return entity;
            })
                .AsObservable();
        }

        public EventMessage AddEventMessage(EventMessage entityDetails)
        {
            AllEventMessages.Push(entityDetails);
            _messageStream.OnNext(entityDetails);
            return entityDetails;
        }

        public void AddError(Exception exception)
        {
            _messageStream.OnError(exception);
        }
    }
}
