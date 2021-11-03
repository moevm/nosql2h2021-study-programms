using System.Collections.Generic;
using System.Threading.Tasks;
using Mapster;
using Microsoft.AspNetCore.Mvc;
using StudyProgramms.Data.Interfaces;
using StudyProgramms.Data.Models;
using StudyProgramms.Web.Dtos;

namespace StudyProgramms.Web.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class StudyProgrammsController : ControllerBase
    {
        private readonly IRepository<StudyProgramm> studyProgrammsRepository;

        public StudyProgrammsController(IRepository<StudyProgramm> studyProgrammsRepository)
        {
            this.studyProgrammsRepository = studyProgrammsRepository;
        }

        [HttpGet]
        public async Task<StudyProgrammListDto> GetAll() =>
            new((await studyProgrammsRepository.GetAsync()).Adapt<IEnumerable<StudyProgrammDto>>());

        [HttpPost]
        public async Task<StudyProgrammDto> Create(CreateStudyProgrammDto programm) =>
            (await studyProgrammsRepository.CreateAsync(programm.Adapt<StudyProgramm>())).Adapt<StudyProgrammDto>();
    }
}
