using StudyProgramms.Data.Enums;

namespace StudyProgramms.Web.Dtos
{
    public record SubjectDto(string Title, string Cafedre, int Semester, int ScoreUnits, CapacityDto Capacity, ControlForm ControlForm);

    public record CapacityDto(int Theory, int Practice);
}
