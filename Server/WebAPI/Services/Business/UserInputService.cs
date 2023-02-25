using Data.Models;
using MessageQueues.MessageProducer;
using Newtonsoft.Json;
using RabbitMQ.Client;

namespace WebAPI.Services
{
    public class UserInputService : IUserInputService
    {

        private readonly IMessageProducer _messageProducer;
        private readonly IConfiguration _configuration;

        public UserInputService(IConfiguration configuration)
        {
            _configuration = configuration; 

            _messageProducer = new MessageProducer(
                queuePath: "userId",
                hostname: string.IsNullOrEmpty(_configuration["RabbitMQHostname"]) ? ConnectionFactory.DefaultUser : _configuration["RabbitMQHostname"] ?? ConnectionFactory.DefaultUser,
                port: string.IsNullOrEmpty(_configuration["RabbitMQPort"]) ? Protocols.DefaultProtocol.DefaultPort : int.Parse(_configuration["RabbitMQPort"] ?? Protocols.DefaultProtocol.DefaultPort.ToString()),
                username: string.IsNullOrEmpty(_configuration["RabbitMQUsername"]) ? ConnectionFactory.DefaultUser : _configuration["RabbitMQUsername"] ?? ConnectionFactory.DefaultUser,
                password: string.IsNullOrEmpty(_configuration["RabbitMQPassword"]) ? ConnectionFactory.DefaultPass : _configuration["RabbitMQPassword"] ?? ConnectionFactory.DefaultPass,
                virtualHost: string.IsNullOrEmpty(_configuration["RabbitMQVirtualHost"]) ? ConnectionFactory.DefaultVHost : _configuration["RabbitMQVirtualHost"] ?? ConnectionFactory.DefaultVHost
            );
        }

        public async Task<bool> HandleCreateInput(UserInput userInput)
        {
            var jsonMessage = JsonConvert.SerializeObject(userInput, new JsonSerializerSettings { ContractResolver = new Newtonsoft.Json.Serialization.CamelCasePropertyNamesContractResolver(), ReferenceLoopHandling = ReferenceLoopHandling.Ignore });

            try
            {
                _messageProducer.SendMessage(jsonMessage);
            }
            catch
            {
                return false;
            }

            return true;
        }
    }
}
