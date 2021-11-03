using System;
using System.Collections.Generic;

namespace StudyProgramms.Web.Dtos
{
    public record StudyProgrammDto(Guid Id, string Title, string Faculty, IEnumerable<SubjectDto> Subjects);
}
