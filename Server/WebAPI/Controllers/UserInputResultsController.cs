using Data;
using Data.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using WebAPI.Services;

namespace WebAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserInputResultsController : ControllerBase
    {
        private readonly DataDBContext _db;

        public UserInputResultsController(DataDBContext db)
        {
            _db = db;
        }

        [HttpGet(nameof(Get))]
        public ActionResult<IEnumerable<UserInputResult>> Get()
        {
            if (_db.UserInputsResult == null)
            {
                return NotFound();
            }

            var userInputsResults = _db.UserInputsResult.Include(i => i.UserInput).ToList();
            return userInputsResults;
        }

        [HttpGet(nameof(Get) + "/{id}")]
        public async Task<ActionResult<UserInputResult>> GetUserInputResult(int id)
        {
            if (_db.UserInputsResult == null)
            {
                return NotFound();
            }
            var userInputResult = await _db.UserInputsResult.Include(i => i.UserInput).FirstOrDefaultAsync(i => i.Id == id);

            if (userInputResult == null)
            {
                return NotFound();
            }

            return userInputResult;
        }

        [HttpPost(nameof(Create))]
        public async Task<IActionResult> Create(UserInputResultDto userInputResultDto)
        {
            UserInputResult userInputResult = new UserInputResult
            {
                CreatedOn = DateTime.Now,
                UserInputId = userInputResultDto.UserInputId,
                ResultDescription = userInputResultDto.ResultDescription,
                BuyOrSell = userInputResultDto.BuyOrSell,
                //KeywordToCount = userInputResultDto.KeywordToCount,
            };
            try
            {
                _db.UserInputsResult.Add(userInputResult);
                await _db.SaveChangesAsync();
            }
            catch (Exception ex)
            {
                return BadRequest(new { error = ex.Message, innerException = ex.InnerException });
            }

            return Ok(new { id = userInputResult.Id });
        }

        [HttpDelete(nameof(Delete) + "/{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            if (_db.UserInputsResult == null)
            {
                return NotFound();
            }

            try
            {
                var userInputResult = _db.UserInputsResult.Find(id);

                if (userInputResult == null)
                {
                    return NotFound();
                }

                _db.UserInputsResult.Remove(userInputResult);
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
