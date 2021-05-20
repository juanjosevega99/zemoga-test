const MongoLib = require('../lib/mongo.lib');
const { config } = require('../config');

class ProfileService {
  constructor() {
    this.collection = 'profile';
    this.mongoDB = new MongoLib();
  }

  async getProfile() {
    return await this.mongoDB.getAll(this.collection, {});
  }

  async getTweets(query) {
    const { TwitterClient } = require('twitter-api-client');

    const twitterClient = new TwitterClient({
      apiKey: config.apiKey,
      apiSecret: config.apiSecret,
      accessToken: config.accessToken,
      accessTokenSecret: config.accessTokenSecret
    });

    const data = await twitterClient.accountsAndUsers.usersSearch({
      q: config.twitterUsername
    });

    const responseTwitterAPI = await twitterClient.tweets.statusesUserTimeline({
      count: 5,
      user_id: data[0].id
    });

    const tweets = [];
    for (const tweet of responseTwitterAPI) {
      tweets.push({ text: tweet.text, username: tweet.user.screen_name });
    }
    return tweets;
  }

  async updateProfile(id, profile) {
    return await this.mongoDB.update(this.collection, id, profile);
  }
}

module.exports = ProfileService;
