using MongoDB.Bson;
using MongoDB.Bson.Serialization;
using MongoDB.Bson.Serialization.Serializers;
using MongoDB.Driver;

namespace StudyProgramms.Data
{
    public class MongoDbContext
    {
        private readonly IMongoDatabase database;

        public MongoDbContext(string connectionString)
        {
            MongoUrl url = MongoUrl.Create(connectionString);
            MongoClient client = new(url);
            database = client.GetDatabase(url.DatabaseName);
            BsonSerializer.RegisterSerializer(new GuidSerializer(GuidRepresentation.Standard));
        }

        public IMongoCollection<T> GetCollection<T>() =>
            database.GetCollection<T>(typeof(T).Name);

    }
}
