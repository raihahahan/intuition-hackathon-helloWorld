using MessageQueues.MessageConsumerService;
using Microsoft.AspNetCore.SignalR;
using RabbitMQ.Client;
using WebSocket.Hub;

namespace MessageHub;
public class Worker : BackgroundService
{
    private readonly ILogger<Worker> _logger;
    private readonly IMessageConsumer _messageConsumer;
    private readonly IHubContext<InputResultHub, IInputResultHub> _messageHub;
    private readonly IConfiguration _configuration;

    public Worker(ILogger<Worker> logger, IHubContext<InputResultHub, IInputResultHub> messageHub, IConfiguration configuration)
    {
        _configuration = configuration;
        _logger = logger;
        _messageHub = messageHub;
        _messageConsumer = new MessageConsumer(name: "InputResultWorker",
        queuePath: _configuration["InputResultQueue"] ?? "inputResultQueue",
        hostname: string.IsNullOrEmpty(_configuration["RabbitMQHostname"]) ? ConnectionFactory.DefaultUser : _configuration["RabbitMQHostname"] ?? ConnectionFactory.DefaultUser,
            port: string.IsNullOrEmpty(_configuration["RabbitMQPort"]) ? Protocols.DefaultProtocol.DefaultPort : int.Parse(_configuration["RabbitMQPort"] ?? Protocols.DefaultProtocol.DefaultPort.ToString()),
        username: string.IsNullOrEmpty(_configuration["RabbitMQUsername"]) ? ConnectionFactory.DefaultUser : _configuration["RabbitMQUsername"] ?? ConnectionFactory.DefaultUser,
        password: string.IsNullOrEmpty(_configuration["RabbitMQPassword"]) ? ConnectionFactory.DefaultPass : _configuration["RabbitMQPassword"] ?? ConnectionFactory.DefaultPass,
        virtualHost: string.IsNullOrEmpty(_configuration["RabbitMQVirtualHost"]) ? ConnectionFactory.DefaultVHost : _configuration["RabbitMQVirtualHost"] ?? ConnectionFactory.DefaultVHost,
        onMessageReceived: onMessageReceived);
    }

    protected override async Task ExecuteAsync(CancellationToken stoppingToken)
    {
        _messageConsumer.Start();
        while (!stoppingToken.IsCancellationRequested)
        {
            _logger.LogInformation("Worker running at: {time}", DateTimeOffset.Now);
            await Task.Delay(1000, stoppingToken);
        }
        _messageConsumer.Stop();
    }

    private async Task onMessageReceived(string message)
    {
        _logger.LogInformation("Message received " + message);
        await _messageHub.Clients.All.SendInputResult(message);
    }
}