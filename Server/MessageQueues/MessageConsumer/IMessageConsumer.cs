using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MessageQueues.MessageConsumerService
{
    public interface IMessageConsumer
    {
        string Name { get; }
        void Start();
        void Stop();
    }
}
