using Microsoft.EntityFrameworkCore;
using DynamicTimetable.Models;
using Microsoft.EntityFrameworkCore.Metadata;

namespace DynamicTimetable.Data
{
    public class ApplicationDbContext : DbContext
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : base(options) { }

        public DbSet<TimetableModel> Timetables { get; set; }


    }
}
