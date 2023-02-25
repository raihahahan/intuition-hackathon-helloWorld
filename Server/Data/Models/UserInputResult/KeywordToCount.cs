using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Data.Models
{
    public class KeywordToCount
    {
        public int Id { get; set; }
        public string Keyword { get; set; } = null!;
        public int Count { get; set; }
        public OrderEnum Order { get; set; }
        public int UserInputResultId { get; set; }
        [ForeignKey(nameof(UserInputResultId))]
        public UserInputResult UserInputResult { get; set; } = null!;
    }
}
