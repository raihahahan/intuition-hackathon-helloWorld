using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Data.Models
{
    public class UserInput : UserInputDto
    {
        public int Id { get; set; }
        public DateTime CreatedOn { get; set; }
        //public int CreatedById { get; set; }
        //[ForeignKey(nameof(CreatedById))]
        //public User CreatedByUser { get; set; }
    }
}
