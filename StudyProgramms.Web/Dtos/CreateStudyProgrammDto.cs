using System.Collections.Generic;

namespace StudyProgramms.Web.Dtos
{
    public record CreateStudyProgrammDto(string Title, string Faculty, IEnumerable<SubjectDto> Subjects);
}
