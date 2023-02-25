using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.SignalR;
using System.Threading.Tasks;
using WebSocket.Hub;

namespace MessageHub
{
    //[Authorize]
    public class InputResultHub : Hub<IInputResultHub>
    {
        public async Task SendInputResult(string message)
        {
            await Clients.All.SendInputResult(message);
        }
    }
}