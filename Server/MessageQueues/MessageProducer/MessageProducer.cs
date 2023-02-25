using RabbitMQ.Client;
using Microsoft.Extensions.Configuration;
using Newtonsoft.Json;
using System.Text;
using log4net;
using System.Reflection;
using RabbitMQ.Client.Events;

namespace MessageQueues.MessageProducer
{
    public class MessageProducer : IMessageProducer
    {
        // utils
        private ILog _logger = LogManager.GetLogger(MethodBase.GetCurrentMethod().DeclaringType);

        // RabbitMQ config
        private string _queuePath;
        private string _hostname;
        private int _port;
        private string _username;
        private string _password;
        private string _virtualHost;
        private IConnection _connection;
        private IModel _channel;

        public MessageProducer(string queuePath, string hostname, int port, string username, string password, string virtualHost)
        {
            _queuePath = queuePath;
            _hostname = hostname;
            _port = port;
            _username = username;
            _password = password;
            _virtualHost = virtualHost;

            Initialize();
        }


        public void SendMessage<T>(T message)
        {
            var json = JsonConvert.SerializeObject(message);
            var body = Encoding.UTF8.GetBytes(json);

            _channel.BasicPublish(exchange: string.Empty,
                                routingKey: _queuePath,
                                body: body);
          
        }

        private void Initialize()
        {
            ConnectionFactory factory = new ConnectionFactory
            {
                HostName = _hostname,
                Port = _port,
                UserName = _username,
                Password = _password,
            };
            _connection = factory.CreateConnection();
            _channel = _connection.CreateModel();
            _channel.QueueDeclare(
                queue: _queuePath,
                durable: true,
                exclusive: false,
                autoDelete: false,
                arguments: null
            );
        }
    }
}