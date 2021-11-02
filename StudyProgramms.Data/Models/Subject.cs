using StudyProgramms.Data.Enums;

namespace StudyProgramms.Data.Models
{
    public class Subject
    {
        public string Title { get; set; }

        public string Cafedre { get; set; }

        public int Semester { get; set; }

        public int ScoreUnits { get; set; }

        public Capacity Capacity { get; set; }

        public ControlForm ControlForm { get; set; }
    }

    public record Capacity(int Theory, int Practice);
}
