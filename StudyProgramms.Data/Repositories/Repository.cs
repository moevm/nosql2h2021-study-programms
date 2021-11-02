using System.Collections.Generic;
using System.Threading.Tasks;
using MongoDB.Driver;
using StudyProgramms.Data.Interfaces;
using StudyProgramms.Data.Models;

namespace StudyProgramms.Data.Repositories
{
    public class Repository<T> : IRepository<T>
        where T : Entity
    {
        private readonly IMongoCollection<T> collection;

        public Repository(MongoDbContext context)
        {
            collection = context.GetCollection<T>();
        }

        public Task<List<T>> GetAsync() =>
            collection.Find(_ => true).ToListAsync();

        public async Task<T> CreateAsync(T item)
        {
            await collection.InsertOneAsync(item);
            return item;
        }
    }
}
