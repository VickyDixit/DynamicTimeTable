using Microsoft.AspNetCore.Mvc;
using DynamicTimetable.Models;
using DynamicTimetable.Data;
using Newtonsoft.Json;
namespace DynamicTimetable.Controllers
{
    public class TimetableController : Controller
    {
        private readonly ApplicationDbContext _context;

        public TimetableController(ApplicationDbContext context)
        {
            _context = context;
        }

        private void SaveModelToTempData(TimetableModel model)
        {
            TempData["TimetableModel"] = JsonConvert.SerializeObject(model);
            TempData.Keep("TimetableModel");
        }

        private TimetableModel GetModelFromTempData()
        {
            if (TempData["TimetableModel"] is string json)
            {
                return JsonConvert.DeserializeObject<TimetableModel>(json);
            }
            return null;
        }

        public IActionResult Index()
        {
            var model = GetModelFromTempData();
            return View(model ?? new TimetableModel());
        }

        public IActionResult BackToFirstPage(TimetableModel model)
        {
            SaveModelToTempData(model);
            return RedirectToAction("Index");
        }

        [HttpPost]
        public IActionResult AssignHours(TimetableModel model)
        {
            if (!ModelState.IsValid)
            {
                return View("Index", model);
            }
            SaveModelToTempData(model); 
            return RedirectToAction("AssignHours");
        }

        public IActionResult AssignHours()
        {
            var model = GetModelFromTempData();
            if (model == null) return RedirectToAction("Index");

            return View(model);
        }

        [HttpPost]
        public IActionResult GenerateTimetable(TimetableModel model)
        {
            if (model.Subjects.Sum(s => s.Hours) != model.TotalHoursForWeek)
            {
                ModelState.AddModelError("", "Total assigned hours must match total hours for the week.");
                return View("AssignHours", model);
            }

            var subjectList = model.Subjects
            .SelectMany(s => Enumerable.Repeat(s.SubjectName, s.Hours))
            .OrderBy(_ => Guid.NewGuid()) // this logick is forr suffle
            .ToList();

            var timetable = Enumerable.Range(0, model.SubjectsPerDay)
                .Select(row => subjectList.Skip(row * model.WorkingDays).Take(model.WorkingDays).ToList())
                .ToList();

            return View("Timetable", timetable);
        }

        public IActionResult Timetable()
        {
            var model = GetModelFromTempData();
            if (model == null) return RedirectToAction("Index");

            return View(model);
        }
    }
}
