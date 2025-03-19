Dynamic Time-Table Generator 📅

Overview
The Dynamic Time-Table Generator is a .NET Core MVC application that allows users to generate a customized weekly timetable based on their input. The system ensures an optimized and structured allocation of subjects across working days.

Key Features
✅ User Input Based Generation

Accepts number of working days (1-7).
Accepts subjects per day (max 8).
Accepts total subjects for the timetable.
✅ Automatic Calculation of Total Weekly Hours

Formula: Total Weekly Hours = No. of Working Days × No. of Subjects Per Day
Displays total hours dynamically.
✅ Subject Hours Allocation

Users can allocate total hours for each subject.
Ensures the sum of all subject hours matches the total weekly hours.
✅ Auto-Generated Timetable

Dynamically places subjects based on allocated hours.
Generates a structured timetable with rows (subjects per day) and columns (working days).
Example Generated Timetable
Monday	Tuesday	Wednesday	Thursday	Friday
Gujarati	Maths	Science	Science	Gujarati
English	Maths	Maths	Maths	English
Science	Gujarati	English	English	Science
Maths	Science	Maths	Science	Maths
Tech Stack
🖥️ Backend: .NET Core MVC
📂 Database: SQL Server (with Entity Framework Core)
🎨 Frontend: Razor Views, Bootstrap

Installation & Setup
1️⃣ Clone the repository

sh
Copy
Edit
git clone https://github.com/your-repo-name.git
cd Dynamic-Time-Table-Generator
2️⃣ Configure database connection in appsettings.json.
3️⃣ Run the application

sh
Copy
Edit
dotnet run
Contributing
Contributions are welcome! Feel free to fork the repo, submit issues, or open pull requests. 🚀
