using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MessageQueues.MessageConsumer
{
    public interface IMessageConsumer
    {
        string Name { get; }
        void Start();
        void Stop();
    }
}
