using System.Collections.Generic;
using System.Threading.Tasks;
using StudyProgramms.Data.Models;

namespace StudyProgramms.Data.Interfaces
{
    public interface IRepository<T>
        where T : Entity
    {
       public Task<List<T>> GetAsync();

       public Task<T> CreateAsync(T item);
    }
}
