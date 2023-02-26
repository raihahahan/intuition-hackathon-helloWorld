using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Data.Models
{
    public class UserInputResult : UserInputResultDto
    {
        public int Id { get; set; }
        public DateTime CreatedOn { get; set; }

        [ForeignKey(nameof(UserInputId))]
        public UserInput UserInput { get; set; } = null!;
    }
}
