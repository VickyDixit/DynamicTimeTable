using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace DynamicTimetable.Models
{
    public class TimetableModel
    {
        [Key]
        public int Id { get; set; }

        [Required]
        [Range(1, 7, ErrorMessage = "Number of working days must be between 1 and 7.")]
        public int WorkingDays { get; set; }

        [Required]
        [Range(1, 8, ErrorMessage = "Subjects per day must be between 1 and 8.")]
        public int SubjectsPerDay { get; set; }

        [Required]
        [Range(1, int.MaxValue, ErrorMessage = "Total subjects must be a positive number.")]
        public int TotalSubjects { get; set; }

        public int TotalHoursForWeek => WorkingDays * SubjectsPerDay;
        public int EnteredHours { get; set; }

        public List<SubjectHours> Subjects { get; set; } = new List<SubjectHours>();

    }
}
