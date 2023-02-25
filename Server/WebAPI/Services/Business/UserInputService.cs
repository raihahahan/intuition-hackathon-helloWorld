using Data.Models;

namespace WebAPI.Services
{
    public class UserInputService : IUserInputService
    {
        public async Task<bool> HandleCreateInput(UserInput userInput)
        {
            return true;
        }
    }
}
