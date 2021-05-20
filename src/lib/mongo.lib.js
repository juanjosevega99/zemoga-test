const { MongoClient, ObjectId } = require('mongodb');
const { config } = require('../config');

const USER = encodeURIComponent(config.dbUser);
const PASSWORD = encodeURIComponent(config.dbPassword);
const DB_NAME = config.dbName;

const MONGO_URI = `${config.dbConnection}://${USER}:${PASSWORD}@${config.dbHost}:${config.dbPort}?retryWrites=true&w=majority`;
class MongoLib {
  constructor() {
    this.client = new MongoClient(MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    this.dbName = DB_NAME;
  }

  async connect() {
    if (!MongoLib.connection) {
      await this.client.connect();
      MongoLib.connection = this.client.db(this.dbName);
      return MongoLib.connection;
    }
    return MongoLib.connection;
  }

  async getAll(collection, query) {
    const db = await this.connect();
    return db.collection(collection).find(query).toArray();
  }

  async get(collection, id) {
    const db = await this.connect();
    return db.collection(collection).findOne({ _id: ObjectId(id) });
  }

  async update(collection, id, data) {
    const db = await this.connect();
    await db
      .collection(collection)
      .updateOne({ _id: ObjectId(id) }, { $set: data }, { upsert: true });
    return this.get(collection, id);
  }
}

module.exports = MongoLib;
