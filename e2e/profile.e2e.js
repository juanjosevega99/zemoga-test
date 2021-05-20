const request = require('supertest');
const { config } = require('../src/config');
const createApp = require('../src/app');

const { MongoClient, ObjectId } = require('mongodb');

const USER = encodeURIComponent(config.dbUser);
const PASSWORD = encodeURIComponent(config.dbPassword);
const DB_NAME = config.dbName;

const MONGO_URI = `${config.dbConnection}://${USER}:${PASSWORD}@${config.dbHost}:${config.dbPort}?retryWrites=true&w=majority`;
const collection = 'profile';

describe('Tests for api/profile', () => {
  let app = null;
  let database = null;

  beforeAll(async () => {
    app = createApp();
    app.listen(3001);
    const client = new MongoClient(MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    await client.connect();
    database = client.db(DB_NAME);
  });

  afterAll(async () => {
    database.dropDatabase();
  });

  describe('GET api/profile', () => {
    it('should return 200 in status code', () => {
      return request(app).get('/api/profile').expect(200);
    });

    it('should return a profile', async () => {
      const dataExpect = await database.collection(collection).insertMany([
        {
          twitter_user_name: 'juanjosevega99',
          description:
            'Software Developer specialist in Backend, who lives, breathes, and creates technology. Never stop learning and currently focusing on NodeJS. Interested in business based on technology. Looking for an opportunity in a company where I add value by solving complex problems through my critical thinking skills, and continuously optimize the products.',
          image_url:
            'https://pbs.twimg.com/profile_images/1309169854218416131/vLBYNRrM_400x400.jpg',
          title: 'Juan Jose Vega'
        }
      ]);
      return request(app)
        .get('/api/profile/')
        .expect(200)
        .then(({ body }) => {
          expect(body.length).toBe(dataExpect.ops.length);
          expect(body[0].twitter_user_name).toBe(
            dataExpect.ops[0].twitter_user_name
          );
        });
    });

    it('should return one profile', () => {
      return request(app)
        .get('/api/profile')
        .expect(200)
        .then(({ body }) => {
          expect(body.length).toBe(1);
        });
    });
  });

  describe('PUT api/profile', () => {});
});
