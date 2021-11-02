using System;
using MongoDB.Bson.Serialization.Attributes;

namespace StudyProgramms.Data.Models
{
    public abstract class Entity
    {
        [BsonId]
        public Guid Id { get; set; }
    }
}
