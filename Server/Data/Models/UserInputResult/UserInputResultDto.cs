using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Data.Models
{
    public class UserInputResultDto
    {
        public string ResultDescription { get; set; } = string.Empty;
        public float BuyOrSell { get; set; } // range -1 (sell) to 1 (buy)
        public int UserInputId { get; set; }
        //public List<KeywordToCount> KeywordToCount { get; set; } = new List<KeywordToCount>();
    }
}
