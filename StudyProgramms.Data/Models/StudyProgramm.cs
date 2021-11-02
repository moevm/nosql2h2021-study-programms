using System.Collections.Generic;

namespace StudyProgramms.Data.Models
{
    public class StudyProgramm
    {
        public string Title { get; set; }

        public string Faculty { get; set; }

        public IEnumerable<Subject> Subjects { get; set; }
    }
}
