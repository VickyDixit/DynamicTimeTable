using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace DynamicTimetable.Models
{
    public class SubjectHours
    {
        [Key]
        public int Id { get; set; }

        [Required]
        public string SubjectName { get; set; }

        [Required]
        public int Hours { get; set; }
    }
}
