using Data.Models;

namespace WebAPI.Services
{
    public interface IUserInputService
    {
        Task<bool> HandleCreateInput(UserInput userInput);
    }
}
