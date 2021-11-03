using System.Collections.Generic;

namespace StudyProgramms.Web.Dtos
{
    public record StudyProgrammListDto(IEnumerable<StudyProgrammDto> StudyProgramms);
}
