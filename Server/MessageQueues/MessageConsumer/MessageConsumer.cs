using log4net;
using Newtonsoft.Json;
using RabbitMQ.Client;
using RabbitMQ.Client.Events;
using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Reflection;
using System.Text;
using Microsoft.Extensions.Configuration;
using MessageQueues.MessageConsumer;

namespace MessageConsumerService
{
    public class MessageConsumer : IMessageConsumer
    {
        // Message consumer details
        private string _name;
        private string _queuePath;
        private bool _isRunning;

        // RabbitMQ config
        private string _hostname;
        private int _port;
        private string _username;
        private string _password;
        private string _virtualHost;
        private IConnection _connection;
        private IModel _channel;
        private EventingBasicConsumer _consumer;

        // callback
        Func<string, Task> _onMessageReceived;

        public MessageConsumer(string name,
                                string queuePath,
                                string hostname,
                                int port,
                                string username,
                                string password,
                                string virtualHost,
                                Func<string, Task> onMessageReceived)
        {
            _onMessageReceived = onMessageReceived;

            _name = name;
            _queuePath = queuePath;
            _isRunning = false;

            _hostname = hostname;
            _port = port;
            _username = username;
            _password = password;
            _virtualHost = virtualHost;

            Initialize();
        }

        private void Initialize()
        {
            ConnectionFactory factory = new ConnectionFactory
            {
                HostName = _hostname,
                Port = _port,
                UserName = _username,
                Password = _password,
                VirtualHost = _virtualHost,
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

            _consumer = new EventingBasicConsumer(_channel);
        }

        public string Name
        {
            get { return _name; }
        }

        public void Start()
        {
            if (!_isRunning)
            {
                _isRunning = true;

            }

            _consumer.Received += async (model, ea) =>
            {
                var body = ea.Body.ToArray();
                var message = Encoding.UTF8.GetString(body);
                Console.WriteLine($" [x] Received {message}");
                await _onMessageReceived(message);

            };

            _channel.BasicConsume(
                queue: _queuePath,
                autoAck: false,
                consumer: _consumer
            );
            Console.WriteLine($"Message receiver for {Name} is started.");

        }

        public void Stop()
        {
            if (_isRunning)
            {
                _isRunning = false;
                _consumer.Received -= async (model, ea) =>
                {
                    var body = ea.Body.ToArray();
                    var message = Encoding.UTF8.GetString(body);
                    Console.WriteLine($" [x] Received {message}");
                };
                Console.WriteLine($"Message receiver for {Name} is stopped.");
            }

        }
    }
}
