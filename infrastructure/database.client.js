import { MongoClient } from "mongodb";

const connectToMongoDB = async (uri = "", options = {}) => {
  if (!process.mongodb) {
    const mongodb = await MongoClient.connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      ssl: process.env.NODE_ENV === "production",
      ...options,
    });

    const db = mongodb.db("Games-List");
    process.mongodb = db;

    return {
      db,
      Collection: db.collection.bind(db),
      connection: mongodb,
    };
  }

  return null;
};

export default await connectToMongoDB("mongodb://localhost:27017", {});
