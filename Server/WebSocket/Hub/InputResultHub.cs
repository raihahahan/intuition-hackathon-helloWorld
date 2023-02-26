using Data;
using Data.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.SignalR;
using Newtonsoft.Json.Linq;
using System.Threading.Tasks;
using WebSocket.Hub;

namespace MessageHub
{
    //[Authorize]
    public class InputResultHub : Hub<IInputResultHub>
    {
        private DataDBContext _db;
        public InputResultHub(DataDBContext db)
        {
            _db = db;
        }
        public async Task SendInputResult(string message)
        {
            await Clients.All.SendInputResult(message);
            //var o = JObject.Parse(message);
            //UserInputResult userInputResult = new UserInputResult
            //{
            //    CreatedOn = (DateTime)(o["CreatedOn"] ?? DateTime.Now),
            //    UserInput = new UserInput
            //    {
            //        CreatedOn = (DateTime)(o["UserInput"]["CreatedOn"] ?? DateTime.Now),
            //        TickerSymbol = (string)o["UserInput"]["TickerSymbol"] ?? "Error"
            //    },
            //    UserInputId = (int)(o["UserInputId"] ?? 0),
            //    ResultDescription = (string)o["ResultDescription"] ?? string.Empty,
            //    BuyOrSell = (float)(o["BuyOrSell"] ?? 0),
            //};

            //try
            //{
            //    _db.UserInputsResult.Add(userInputResult);
            //}
            //catch (Exception ex)
            //{

            //}
           

        }
    }
}