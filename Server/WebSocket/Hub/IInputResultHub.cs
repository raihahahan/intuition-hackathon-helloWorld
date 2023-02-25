namespace WebSocket.Hub
{
    public interface IInputResultHub
    {
        Task SendInputResult(string message);
    }
}
