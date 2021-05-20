require('dotenv').config();

const config = {
  dev: process.env.NODE_ENV !== 'production',
  port: process.env.PORT || 4000,
  dbUser: process.env.MONGO_USER,
  dbPassword: process.env.MONGO_PASSWORD,
  dbHost: process.env.MONGO_HOST,
  dbName: process.env.MONGO_DB_NAME,
  dbPort: process.env.MONGO_PORT,
  dbConnection: process.env.MONGO_CONNECTION,
  apiKey: process.env.APIKEY,
  apiSecret: process.env.APISECRET,
  accessToken: process.env.ACCESSTOKEN,
  accessTokenSecret: process.env.ACCESSTOKENSECRET,
  twitterUsername: process.env.TWITTERUSERNAME
};

module.exports = { config };
