using Data;
using Data.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using WebAPI.Services;

namespace WebAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserInputController : ControllerBase
    {
        private readonly DataDBContext _db;
        private readonly IUserInputService _userInputService;

        public UserInputController(DataDBContext db, IUserInputService userInputService)
        {
            _db = db;
            _userInputService = userInputService;
        }

        [HttpGet(nameof(Get))]
        public ActionResult<IEnumerable<UserInput>> Get()
        {
            if (_db.UserInputs == null)
            {
                return NotFound();
            }

            var userInputs = _db.UserInputs.ToList();
            return userInputs;
        }

        [HttpGet(nameof(Get) + "/{id}")]
        public async Task<ActionResult<UserInput>> GetUserInput(int id)
        {
            if (_db.UserInputs == null)
            {
                return NotFound();
            }
            var userInput = await _db.UserInputs.FindAsync(id);

            if (userInput == null)
            {
                return NotFound();
            }

            return userInput;
        }

        [HttpPost(nameof(Create))]
        public async Task<IActionResult> Create(UserInputDto userInputDto)
        {
            try
            {
                UserInput userInput = new UserInput
                {
                    TickerSymbol = userInputDto.TickerSymbol,
                    CreatedOn = DateTime.Now,
                };

                _db.UserInputs.Add(userInput);
                await _db.SaveChangesAsync();
                bool res = await _userInputService.HandleCreateInput(userInput);

                if (!res)
                {
                    throw new Exception("Failed to pass user input to queue.");
                }
            }
            catch (Exception ex)
            {
                return BadRequest(new { error = ex.Message, innerException = ex.InnerException });
            }

            return Ok("Input has been sent to message queue");
        }

        [HttpDelete(nameof(Delete) + "/{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            if (_db.UserInputs == null)
            {
                return NotFound();
            }

            try
            {
                var userInput = _db.UserInputs.Find(id);

                if (userInput == null)
                {
                    return NotFound();
                }

                _db.UserInputs.Remove(userInput);
                await _db.SaveChangesAsync();
                return Ok();
            }
            catch (Exception ex)
            {
                return BadRequest(new { error = ex.Message, innerException = ex.InnerException });
            }
        }
    }
}
